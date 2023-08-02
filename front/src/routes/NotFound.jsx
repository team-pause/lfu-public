import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

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

export default function NotFound() {
  return (
    <Container>
      <Message>Not Found</Message>
      <LeaveMessage>
        찾을 수 없는 페이지입니다.<br></br>
        다시 시도해보세요.
        <br />
        <br />
        오류가 계속된다면 관리자에게 문의해주세요.
      </LeaveMessage>
      <ButtonContainer>
        <Button to="/onboarding">홈으로</Button>
      </ButtonContainer>
    </Container>
  );
}
