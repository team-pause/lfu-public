import styled from "styled-components";
import Button from "../components/Button";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  font-family: "KIMM";
  font-size: 24px;
  color: var(--gray-600);
  text-align: center;

  margin-bottom: 48px;
`;

const DateContainer = styled.div`
  display: inline;
  color: var(--gray-100);
`;
const NumContainer = styled.div`
  display: inline;

  color: var(--gray-100);
`;

export default function Last() {
  return (
    <Container>
      <MessageContainer>
        <DateContainer>2023년 6월 20일</DateContainer>
        <span>부터</span>
        <br></br>
        <br></br>

        <DateContainer>2023년 7월 7일</DateContainer>
        <span>까지</span>
        <br></br>
        <br></br>

        <NumContainer>30</NumContainer>
        <span>개의 별이 모였습니다.</span>
      </MessageContainer>
      <Button to={"letters"}>확인하러 가기</Button>
    </Container>
  );
}
