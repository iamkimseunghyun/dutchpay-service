import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      navigate("/members");
    } else {
      setValidGroupName(false);
    }
    setValidated(true);
  };
  return (
    <CenteredOverlayForm
      title="먼저, 더치페이 할 그룹의 이름을 정해 볼까요?"
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <FormGroup controlId="validationGroupName">
        <Form.Control
          type="text"
          required
          placeholder="2022 제주도 여행"
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
          그룹 이름을 입력해 주세요.
        </Form.Control.Feedback>
      </FormGroup>
    </CenteredOverlayForm>
  );
};

export default CreateGroup;
