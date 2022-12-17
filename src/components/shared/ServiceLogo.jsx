import React from "react";
import styled from "styled-components";

const ServiceLogo = () => {
  return <StyledLogo>Dutch Pay</StyledLogo>;
};

const StyledLogo = styled.h1`
  font-wieght: 200;
  letter-spacing: 10px;
  color: slateblue;
  text-align: center;
  margin-bottom: 0.8em;
`;

export default ServiceLogo;
