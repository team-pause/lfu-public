import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import StarEnvelop from "../components/StarEnvelop";
import axios from "axios";
import Header from "../components/Header";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";
import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const LetterList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Letter = styled.div`
  width: 90%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--gray-800);
  border-radius: 12px;

  margin-bottom: 10px;
`;

const LetterName = styled.div`
  font-size: 14px;
  color: var(--gray-400);
  font-weight: 300;

  margin-left: 24px;
`;

const LetterContent = styled.div`
  font-size: 14px;
  color: var(--gray-200);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 32px;
`;

const LetterDate = styled.div`
  font-size: 12px;
  color: var(--gray-600);
  margin-top: 48px;
  margin-right: 24px;
`;

const LinkStyle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

export default function LastLettersList() {
  const navigate = useNavigate();
  const { userPk } = useParams();

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    axios.get(`${setUrl}/user`).then((response) => {
      if (response.data[0].ddayLogin === false) {
        alert("아직 별을 확인할 수 없습니다.");
        navigate("/onBoarding");
      }
    });
  });

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      alert("로그인 후 접속 가능한 화면입니다.");
      navigate("/onBoarding");
    } else if (checkLogin() && checkUser({ userPk })) {
    } else {
      alert("별의 주인만 편지를 읽어볼 수 있습니다.");
      navigate("/onBoarding");
    }
  });

  useEffect(() => {
    axios
      .get(`${setUrl}/letter/user/${userPk}`)
      .then((response) => {
        setLetters(response.data);
      })
      .catch((error) => {
        console.error("LastLettersList에서 setLetters 실패: " + error);
      });
  }, []);

  return (
    <Container>
      <Header location={`/home/${userPk}/last/letters`}></Header>
      <TitleContainer>
        <StarEnvelop />
      </TitleContainer>
      <LetterList>
        {letters.map((letter, index) => (
          <LinkStyle to={`${index}`} key={index}>
            <Letter>
              <LetterName>{letter.sendUserName}</LetterName>
              <LetterContent>{letter.content}</LetterContent>
              <LetterDate>{letter.createdAt.substring(0, 10)}</LetterDate>
            </Letter>
          </LinkStyle>
        ))}
      </LetterList>
    </Container>
  );
}
