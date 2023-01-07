import { Button, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import OverlayWrapper from "./OverlayWrapper";
import ServiceLogo from "./ServiceLogo";

const CenteredOverlayForm = ({ title, children, validated, handleSubmit }) => {
  return (
    <CentralizedContainer>
      <ServiceLogo>Dutch Pay</ServiceLogo>
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledCentralizedRow>
              <Row className="aligin-items-start">
                <StyledTitle>{title}</StyledTitle>
              </Row>
              <Row className="aligin-items-center">{children}</Row>
              <Row className="aligin-items-end">
                <StyledSubmitButton type="submit">저장</StyledSubmitButton>
              </Row>
            </StyledCentralizedRow>
          </Form>
        </Container>
      </OverlayWrapper>
    </CentralizedContainer>
  );
};

const CentralizedContainer = styled(Container)`
  width: 50vw;
  @media (max-width: 500px) {
    width: 80vw;
  }
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 18px;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;

  &:hover {
    background-color: #6610f2;
    filter: Brightness(80%);
  }
`;

const StyledCentralizedRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
export default CenteredOverlayForm;
