import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
`;

const FromContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const From = styled.div`
  color: var(--primary);
  font-size: 16px;
  font-family: "KIMM";
`;

const FromInput = styled.input`
  height: 24px;
  width: 50%;

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

const ContentContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const ContentTitle = styled.div`
  color: var(--primary);
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 8px;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  background: transparent;
  border: 1px solid var(--primary);
  border-radius: 12px;

  color: var(--gray-300);
  font-family: "Pretendard";
  font-size: 18px;
  font-weight: 300;

  letter-spacing: 0.08em;
  line-height: 1.5;

  ::placeholder {
    color: var(--gray-400);
    font-family: "KIMM";
    font-size: 12px;
  }

  padding: 12px;
`;

export default function HomeIdWrite() {
  const { userPk } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shape = queryParams.get("shape");
  const color = queryParams.get("color");

  const [fromValue, setFromValue] = useState("");
  const [contentValue, setContentValue] = useState("");

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
  };

  const handleContentChange = (e) => {
    setContentValue(e.target.value);
  };

  //통신
  const navigate = useNavigate();
  const createdAt = Date.now(); // Get current timestamp in milliseconds

  const handleButtonSubmit = () => {
    if (fromValue.trim() === "" || contentValue.trim() === "") {
      alert("이름, 내용을 입력해주세요.");
      return;
    }

    axios
      .post(`${setUrl}/letter`, {
        sendUserName: fromValue,
        receiveUserId: userPk,
        color: color,
        shape: shape,
        content: contentValue,
        isRead: false,
        createdAt: createdAt,
      })
      .then((response) => {
        // console.log(response.data); // 디버그용
      })
      .then(() => {
        navigate(`/home/${userPk}`);
        window.location.reload(); // 페이지 이동 후 새로고침
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (location.state && location.state.reload) {
    window.location.reload();
  }

  const isButtonDisabled =
    fromValue.trim() === "" || contentValue.trim() === "";

  return (
    <Container>
      <Header location={`/home/${userPk}/letter`} />
      <FromContainer>
        <From>FROM</From>
        <FromInput
          placeholder="이름을 입력해주세요."
          value={fromValue}
          onChange={handleFromChange}
          maxLength={16}
        ></FromInput>
      </FromContainer>
      <ContentContainer>
        <ContentTitle>당신의 별에는 어떤 이야기가 담겨있나요?</ContentTitle>

        <ContentTextArea
          placeholder="200자까지 작성 가능합니다."
          required
          rows="11"
          maxLength={200}
          value={contentValue}
          onChange={handleContentChange}
        ></ContentTextArea>
      </ContentContainer>

      <Button onClick={handleButtonSubmit} disabled={isButtonDisabled}>
        별 편지 보내기
      </Button>
      <div
        style={{
          color: "#afafaf",
          fontSize: "13px",
          fontFamily: "Pretendard",
          fontWeight: 100,
          lineHeight: 1.4,
          marginTop: "12px",
        }}
      >
        지금 보낸 편지는 <br></br>
        <p style={{ display: "inline", color: "#8c00ff", fontWeight: 500 }}>
          7월 7일
        </p>
        에 친구가 읽을 수 있어요! 💬
      </div>
    </Container>
  );
}
