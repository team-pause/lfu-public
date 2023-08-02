import React from "react";
import styled from "styled-components";
import ButtonKakao from "../components/ButtonKakao";
import Question from "../icon/Question";
import OnBoardingModal from "../components/OnboardingModal";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FirstContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: 0.145em;
  color: var(--gray-100);
  /* color: var(--primary); */
  /* color: var(--secondary); */
`;
const SubTitle = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.145em;
  color: var(--primary);
`;

const Text = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: var(--gray-100);

  margin-bottom: 24px;
`;

const TextContainer = styled.div`
  color: var(--gray-500);
  font-size: 12px;

  width: 80%;
  max-width: 18.4375rem;

  font-family: "Pretendard";
  font-weight: 300;
`;

const QuestionContainer = styled.div`
  display: inline;
  /* display: flex; */
`;

export default function OnBoarding() {
  const [isOpen, setIsOpen] = useState(false); // 공유하기

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <FirstContainer>
        <Title>우주에서 온 편지</Title>
        <SubTitle>
          Letters From The Universe{" "}
          <QuestionContainer onClick={openModalHandler}>
            <Question />
          </QuestionContainer>
        </SubTitle>
      </FirstContainer>
      <SecondContainer>
        <TextContainer
          style={{
            textAlign: "center",
            color: "#fbff00a3",
            marginBottom: "4px",
          }}
        >
          7월 6일까지만 신규가입이 가능해요 🗯️
        </TextContainer>
        <ButtonKakao />
        <TextContainer>
          시작하실 경우,
          <a href="https://imported-blouse-29a.notion.site/a80c8a00f6fa4d048e1f0382108690ed?pvs=4">
            서비스 이용약관
          </a>
          과{" "}
          <a href="https://imported-blouse-29a.notion.site/c50e9cae538d452aaf17fda59ce7e77d?pvs=4">
            개인정보 보호정책
          </a>
          에 동의하게 됩니다.
        </TextContainer>
      </SecondContainer>
      {isOpen && <OnBoardingModal onClick={openModalHandler} />}
    </Container>
  );
}
