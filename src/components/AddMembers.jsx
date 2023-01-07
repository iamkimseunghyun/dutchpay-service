import { useState } from "react";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";
import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { Form } from "react-bootstrap";

const AddMembers = () => {
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const groupName = useRecoilValue(groupNameState);
  const [groupMembersString, setGroupMembersString] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (groupMembers.length > 0) {
      navigate(ROUTES.EXPENSE_MAIN);
    } else if (isSamsungInternet && groupMembersString.length > 0) {
      setGroupMembers(groupMembersString.split(","));
    }
  };

  // todo: performance optimization
  const isSamsungInternet = window.navigator.userAgent.includes("SAMSUNG");

  const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`;
  return (
    <CenteredOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      {/* TODO: InputTags 가 동작하지 않는 환경에서, 어떻게 이름 값을 ,로 구분해서 받는다 */}
      {isSamsungInternet ? (
        <Form.Control
          placeholder="이름 간 컴파(,)로 구분"
          onChange={({ target }) => setGroupMembersString(target.value)}
        />
      ) : (
        <InputTags
          data-testid="input-member-names"
          placeholder="이름 간 띄어 쓰기"
          onTags={(value) => setGroupMembers(value.values)}
        />
      )}

      {validated && groupMembers.length === 0 && (
        <StyledErrorMessage>
          그룹 멤버들의 이름을 입력해 주세요.
        </StyledErrorMessage>
      )}
    </CenteredOverlayForm>
  );
};

const StyledErrorMessage = styled.span`
  color: red;
`;

export default AddMembers;
