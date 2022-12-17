import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { groupNameState } from "../state/groupName";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import SettlementSummary from "./SettlementSummary";
import ServiceLogo from "./shared/ServiceLogo";

const ExpenseMain = () => {
  return (
    <Container>
      <Row>
        <Col>
          <LeftPane />
        </Col>
        <Col>
          <RighttPane />
        </Col>
      </Row>
    </Container>
  );
};

const LeftPane = () => (
  <Container>
    <StyledGapRow>
      <Row>
        <ServiceLogo />
      </Row>
      <Row>
        <AddExpenseForm />
      </Row>
      <Row>
        <SettlementSummary />
      </Row>
    </StyledGapRow>
  </Container>
);

const RighttPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledRightPaneWrapper>
      <Row>
        <StyledGroupName>{groupName || "그룹 이름"}</StyledGroupName>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRightPaneWrapper>
  );
};

const StyledGroupName = styled.h2`
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;

const StyledRightPaneWrapper = styled(Container)`
  padding: 100px 31px 100px 31px;
  @media screen and (max-width: 600px) {
    padding: 50px 25px;
  }
`;

const StyledContainer = styled(Container)`
  padding: 100px 31px 100px 31px;
`;

const StyledGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 100px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    padding-top: 30px;
  }
`;

export default ExpenseMain;
