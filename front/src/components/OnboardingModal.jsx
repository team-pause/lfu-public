import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { channelKakao } from "../utils/channelKaKao";
import OnBoarding from "../routes/OnBoarding";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const ModalContent = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  /* background-color: var(--secondary); */
  background: linear-gradient(180deg, #141331 0%, #2f2050 100%);
  padding: 40px;
  border-radius: 5px;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  font-family: "Gangwon";
`;
const TitleContainer = styled.div`
  color: var(--gray-200);
  font-size: 26px;
`;

const ContentContainer = styled.div`
  color: var(--gray-200);
  font-size: 16px;
  line-height: 1.4;
`;

const OnBoardingModal = ({ onClick }) => {
  const location = useLocation();
  // console.log(location); // 디버그용
  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClick();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler); // 모바일 대응

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler); // 모바일 대응
    };
  }, [onClick]);

  return (
    <ModalContainer>
      <ModalContent ref={modalRef}>
        <Container>
          <TitleContainer>우주에서 온 편지💫</TitleContainer>
          <ModalCloseButton onClick={onClick}>X</ModalCloseButton>

          <ContentContainer>
            <br></br>
            {/* <br></br> */}
            우주에서 온 편지가 뭐죠?
            <br></br>🌌 우주 배경의 온라인 롤링페이퍼 서비스입니다.
            <br></br>📩 편지를 받으려는 사람은 계정을 만들어야 하며,
            <br></br>📮 편지를 보내는 사람은 계정을 만들지 않으셔도 됩니다.
            <br></br>✨받은 편지의 글쓴이와 개수는 실시간으로 확인하실 수
            있지만,
            <br></br>✨받은 편지의 내용은 7월 7일에 확인하실 수 있습니다.
            <br></br>
            <br></br>
            당신들은 누구죠?
            <br></br> 👭 개발을 좋아하는 총 2인으로 구성된 팀 pause 입니다!
            <br></br> 🤩 금전적 이익을 목적으로 하지 않는 프로젝트를
            진행중입니다.
            <br></br>
            <br></br>
            <div
              style={{
                color: "#bbba7a9d",
                fontFamily: "Pretendard",
                fontSize: "12px",
                fontWeight: 300,
              }}
            >
              {" "}
              문의) teampause77@gmail.com
            </div>
          </ContentContainer>
        </Container>
      </ModalContent>
    </ModalContainer>
  );
};

export default OnBoardingModal;
