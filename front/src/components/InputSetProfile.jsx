import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--);
`;

export default function InputSetProfile() {
  return <InputStyle placeholder="사용하실 이름을"></InputStyle>;
}
