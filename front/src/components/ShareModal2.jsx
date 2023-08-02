import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { channelKakao } from "../utils/channelKaKao";
import OnBoarding from "../routes/OnBoarding";
import KakaoChannel from "../icon/KakaoChannel";

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
  color: var(--gray-100);
  font-size: 26px;
`;

const ContentContainer = styled.div`
  color: var(--gray-300);
  font-size: 16px;
  line-height: 1.4;
`;

const KakaoButton = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  /* width: 10%; */
`;

const KakaoImg = styled.img`
  border-radius: 10px;
  width: 20px;
`;

const KakaoText = styled.div`
  font-size: 12px;
`;

const ShareModal2 = ({ onClick, userNickname }) => {
  useEffect(() => {
    //카카오  호출
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

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
          <TitleContainer>
            빛나는 별 “{userNickname}"님 환영합니다.
          </TitleContainer>
          <ModalCloseButton onClick={onClick}>X</ModalCloseButton>

          <ContentContainer>
            <br></br>
            <div> 🌌 이곳은 당신만의 우주입니다. </div>
            <div> 당신의 우주를 더욱 빛나게 하고 싶으신가요?🌌 </div>
            <br></br>
            “내가 있는 곳 공유하기”를 통해 친구들에게 링크를 전달해보세요.{" "}
            <br></br>
            링크를 통해 들어온 친구는 📩를 보낼 수 있습니다. <br></br>
            편지는 ⭐️이 되어 {userNickname}님의 우주에 채워집니다. <br></br>
            <br></br>
            ❗️7월 7일 00시, 별들이 모여 은하를 이루게 됩니다. <br></br>
            7월 7일 이후 로그인시 편지 내용을 확인하실 수 있습니다.❗️ <br></br>
            <br></br>
            <div
              style={{ color: " #ecff6f", lineHeight: "1", fontSize: "12px" }}
            >
              💬 카카오톡 채널 추가 시 편지가 열리는 7월 7일에 알림을 받으실 수
              있습니다.
              <br></br>🤙상업용 메시지는 발송하지 않을 것을 약속드립니다.
            </div>
            <KakaoButton onClick={() => channelKakao()}>
              <KakaoChannel />
              {/* <KakaoImg src="/KakaoChannel.png" alt={"Kakao Logo"} /> */}
              {/* <KakaoText>
                &nbsp;카카오톡 채널추가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </KakaoText> */}
            </KakaoButton>
          </ContentContainer>
        </Container>
      </ModalContent>
    </ModalContainer>
  );
};

export default ShareModal2;
