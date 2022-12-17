import React from "react";
import styled from "styled-components";

const OverlayWrapper = ({ children, padding, minHeight }) => {
  return (
    <StyledContainer padding={padding} minHeight={minHeight}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: ${(props) => props.padding || "5px"};
  border-radius: 15px;
  background-color: white;
  filter: drop-shadow(8px 4px 4px rgba(0, 0, 0, 0.25));
  min-height: ${(props) => props.minHeight || "0"};
`;

export default OverlayWrapper;
