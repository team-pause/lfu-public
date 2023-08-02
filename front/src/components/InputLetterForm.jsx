import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 100%;
  border-radius: 16px;
  background-color: #f3f4f6;
  ::placeholder {
    color: ${(props) => props.placeholderColor};
    font-size: 14px;
  }
`;

function Input(props) {
  return (
    <InputStyle type={props.type} placeholder={props.placeholder}></InputStyle>
  );
}

export default Input;
