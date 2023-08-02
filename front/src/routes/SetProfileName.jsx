import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  height: 70vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30vh;
`;

const InputStyle = styled.input`
  width: 90%;
  height: 42px;
  margin-bottom: 32px;

  background: transparent;
  text-align: center;

  border: none;
  border-bottom: 1px solid var(--gray-600);

  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 16px;

  ::placeholder {
    color: var(--gray-600);
    font-family: "KIMM";
    font-size: 16px;
  }
`;

export default function SetProfileName() {
  const [inputValue, setInputValue] = useState("");
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    setInputId(() => id);
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonSubmit = () => {
    if (inputValue.trim() !== "") {
      navigate(`/setprofile/shape1?name=${inputValue}&id=${inputId}`);
    }
  };

  const isButtonDisabled = inputValue.trim() === "";

  return (
    <Container>
      <InputStyle
        placeholder="사용하실 이름을 입력해주세요."
        onChange={handleInputChange}
        required
        type="text"
        maxLength={11}
      />
      <Button onClick={handleButtonSubmit} disabled={isButtonDisabled}>
        확인
      </Button>
    </Container>
  );
}
