import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { shareKakao } from "../utils/shareKakaoLink";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { setUrlFront } from "../utils/setUrlFront";

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
  display: flex;
  background-color: #fff;
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
`;

const Title = styled.div`
  position: absolute;
  top: 14px;
  right: 86px;
`;

const KakaoButton = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const KakaoImg = styled.img`
  border-radius: 10px;
  width: 20px;
`;

const KakaoText = styled.div`
  font-size: 12px;
`;

const LinkButton = styled.div`
  display: flex;
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

const LinkImg = styled.img`
  border-radius: 10px;
  width: 20px;
`;

const LinkText = styled.div`
  font-size: 12px;
`;

const ShareModal = ({ onClick }) => {
  const location = useLocation();
  // console.log(location); // 디버그용
  const baseUrl = "http://52.79.90.119:3000";

  const modalRef = useRef(null);

  useEffect(() => {
    //카카오 공유하기 호출
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
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

  const handleCopyClipBoard = async (text) => {
    try {
      const copyToClipBoard = (content) => {
        if (window.isSecureContext && navigator.clipboard) {
          navigator.clipboard.writeText(content);
        } else {
          unsecuredCopyToClipboard(content);
        }
      };
      // await navigator.clipboard.writeText(text);
      await copyToClipBoard(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textArea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }

  return (
    <ModalContainer>
      <ModalContent ref={modalRef}>
        <ModalCloseButton onClick={onClick}>X</ModalCloseButton>
        <Title>공유하기</Title>

        <KakaoButton
          onClick={() => shareKakao(`${baseUrl}${location.pathname}`)}
        >
          <KakaoImg src="/kakaotalk_sharing_btn_small.png" alt={"Kakao Logo"} />
          <KakaoText>
            &nbsp;카카오톡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </KakaoText>
        </KakaoButton>

        <LinkButton
          onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
        >
          <LinkImg src="/shareLink.png" alt={"shareImg"}></LinkImg>
          <LinkText>&nbsp;링크복사</LinkText>
        </LinkButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ShareModal;
