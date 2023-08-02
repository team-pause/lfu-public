import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Message = styled.div`
  font-family: "KIMM";
  font-size: 36px;
  color: var(--gray-100);
  text-align: center;
`;

const LeaveMessage = styled.span`
  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 20px;

  line-height: 25px;
  letter-spacing: 0.05em;
`;

const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function WithdrawComplete() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      alert("로그인 후 접속 가능한 화면입니다.");
      navigate("/onBoarding");
    } else if (checkLogin()) {
    } else {
      alert("회원만 탈퇴가 가능합니다.");
      navigate("/onBoarding");
    }
  });

  return (
    <Container>
      <Message>탈퇴 완료</Message>
      <LeaveMessage>
        탈퇴가 완료되었습니다.<br></br>
        그 동안 이용해주셔서 감사합니다.
        <br />
        <br />
        돌아오실 때까지 기다리고 있을게요.
        <br />
      </LeaveMessage>
      <ButtonContainer>
        <Button to="/onboarding">홈으로</Button>
      </ButtonContainer>
    </Container>
  );
}
