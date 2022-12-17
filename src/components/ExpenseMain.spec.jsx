import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import ExpenseMain from "./ExpenseMain";

const renderComponent = () => {
  render(
    <RecoilRoot
      initializeState={(snap) => {
        snap.set(groupMembersState, ["영수", "영희"]);
      }}
    >
      <ExpenseMain />
    </RecoilRoot>
  );

  const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
  const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
  const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
  const payerInput = screen.getByDisplayValue(/누가 결제/i);
  const addButton = screen.getByText("추가하기");
  // const shareButton = screen.getByTestId("share-btn");
  const descErrorMessage = screen.getByText(
    "비용 내용을 입력해 주셔야 합니다."
  );
  const payerErrorMessage = screen.getByText("결제자를 선택해 주셔야 합니다.");
  const amountErrorMessage = screen.getByText(
    "1원 이상의 금액을 입력해 주셔야 합니다."
  );

  return {
    dateInput,
    descInput,
    amountInput,
    payerInput,
    addButton,
    // shareButton,
    descErrorMessage,
    payerErrorMessage,
    amountErrorMessage,
  };
};

describe("비용 정산 메인 페이지", () => {
  describe("비용 추가 컴포넌트", () => {
    test("비용 추가 컴포넌트 렌더링", () => {
      const { dateInput, descInput, amountInput, payerInput, addButton } =
        renderComponent();

      expect(dateInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      expect(payerInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });

    test("비용 추가에 필수적인 값을 입력하지 않고 '추가' 버튼 클릭시, 에러 메세지를 노출한다.", async () => {
      const {
        addButton,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage,
      } = renderComponent();

      expect(addButton).toBeInTheDocument();
      await userEvent.click(addButton);

      expect(descErrorMessage).toHaveAttribute("data-valid", "false");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "false");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "false");
    });

    test("비용 추가에 필수적인 값들을 입력한 후 '추가' 버튼 클릭시, 저장에 성공", async () => {
      const {
        descInput,
        descErrorMessage,
        payerErrorMessage,
        amountInput,
        payerInput,
        addButton,
        amountErrorMessage,
      } = renderComponent();
      await userEvent.type(descInput, "장보기");
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수"); // 테스트를 돌리기 전에 payerList 를 셋업해야 한다.
      await userEvent.click(addButton);

      expect(descErrorMessage).toHaveAttribute("data-valid", "true");
      expect(payerErrorMessage).toHaveAttribute("data-valid", "true");
      expect(amountErrorMessage).toHaveAttribute("data-valid", "true");
    });
  });

  describe("비용 리스트 컴포넌트", () => {
    test("비용 리스트 컴포넌트가 렌더링 되는가?", () => {
      renderComponent();
      const expenseListComponent = screen.getByTestId("expenseList");

      expect(expenseListComponent).toBeInTheDocument();
    });

    test("비용 데이터가 존재할 경우, 날짜, 내용, 결제자, 금액 데이터가 보여지는가", () => {
      renderComponent();
      const expenseListComponent = screen.getByTestId("expenseList");
      expect(expenseListComponent).toBeInTheDocument();
    });
  });

  describe("정산 결과 컴포넌트가 렌더링 되는가", () => {
    renderComponent();
    const component = screen.getByText(/정산은 이렇게/i);
    expect(component).toBeInTheDocument();
  });

  describe("새로운 비용이 입력 되었을 때", () => {
    const addNewExpoense = async () => {
      const { dateInput, descInput, payerInput, amountInput, addButton } =
        renderComponent();
      await userEvent.type(dateInput, "2022-12-15");
      await userEvent.type(descInput, "장보기");
      await userEvent.type(amountInput, "30000");
      await userEvent.selectOptions(payerInput, "영수");
      await userEvent.click(addButton);
    };

    beforeEach(async () => {
      await addNewExpoense();
    });
    test("날짜, 내용, 결제자, 금액 데이터가 리스트에 추가된다", () => {
      const expenseListComponent = screen.getByTestId("expenseList");
      const dateValue = within(expenseListComponent).getByText("2022-12-16");
      expect(dateValue).toBeInTheDocument();

      const descValue = within(expenseListComponent).getByText("장보기");
      expect(descValue).toBeInTheDocument();

      const payerValue = within(expenseListComponent).getByText("영수");
      expect(payerValue).toBeInTheDocument();

      const amountValue = within(expenseListComponent).getByText("30000 원");
      expect(amountValue).toBeInTheDocument();
    });

    test("정산 결과 또한 업데이트가 된다.", () => {
      const totalText = screen.getByText(/2명 - 총 30000 원 지출/i);
      expect(totalText).toBeInTheDocument();

      const transactionText =
        screen.getByText(/영희가 영수에게 15000원 보내기/i);
      expect(transactionText).toBeInTheDocument();
    });

    const htmlToImage = require("html-to-image");
    test("정산 결과를 이미지 파일로 저장할 수 있다.", async () => {
      const spiedToPng = jest.spyOn(htmlToImage, "toPng");
      const downloadBtn = screen.getByTestId("btn-download");
      expect(downloadBtn).toBeInTheDocument();

      await userEvent.click(downloadBtn);

      expect(spiedToPng).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});
