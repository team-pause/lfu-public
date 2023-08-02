import { useLocation, useParams, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import UnionLeft from "../icon/UnionLeft";
import UnionRight from "../icon/UnionRight";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";
import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const FromContainer = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 32px;

  background: transparent;
  text-align: center;

  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 16px;
`;

const FromName = styled.div`
  color: var(--gray--100);
  font-size: 20px;
  font-family: "KIMM";
`;

const FromLetter = styled.div`
  color: var(--primary);
  font-size: 16px;
  font-family: "KIMM";
`;

const ContentContainer = styled.div`
  width: 85%;
  height: 428px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: var(--gray-800);
  border-radius: 12px;

  margin-bottom: 64px;
`;

const Content = styled.div`
  width: 100%;

  color: var(--gray-300);
  font-size: 20px;

  font-family: "Pretendard";
  font-weight: 300;

  letter-spacing: 0.08em;
  line-height: 24px;

  padding: 16px;
`;

export default function LastLettersListId() {
  const { letterPk, userPk } = useParams();
  const location = useLocation();
  const [letters, setLetters] = useState([]);
  const navigate = useNavigate();

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
    axios.get(`${setUrl}/user`).then((response) => {
      if (response.data[0].ddayLogin === false) {
        alert("아직 별을 확인할 수 없습니다.");
        navigate("/onBoarding");
      }
    });
  });
  // console.log("userPk: " + userPk); // 디버그용
  // console.log("letterPk: " + letterPk); // 디버그용

  useEffect(() => {
    axios
      .get(`${setUrl}/letter/user/${userPk}`)
      .then((response) => {
        setLetters(response.data);
      })
      .catch((error) => {
        console.error("LastLettersList에서 setLetters 실패: " + error);
      });
  }, [letterPk]);

  const urlPre = location.pathname.replace(
    `${letterPk}`,
    `${parseInt(letterPk) - 1}`
  );
  const urlNext = location.pathname.replace(
    `${letterPk}`,
    `${parseInt(letterPk) + 1}`
  );

  const maxId = Math.max(...letters.map((letter) => letter.id));
  return (
    <Container>
      <Header location={`/home/${userPk}/last/letters/list`}></Header>
      <FromContainer>
        <FromName>{letters !== [] && letters[letterPk]?.sendUserName}</FromName>
        <FromLetter>님으로부터의 편지</FromLetter>
      </FromContainer>
      <ContentContainer>
        {`${parseInt(letterPk) - 1}` > -1 ? (
          <Link to={urlPre}>
            <Icon outSize={"40px"} inSize={"32px"}>
              <UnionLeft />
            </Icon>
          </Link>
        ) : (
          <Icon outSize={"40px"} inSize={"32px"}></Icon>
        )}

        <Content>{letters !== [] && letters[letterPk]?.content}</Content>

        {parseInt(letterPk) >= letters.length - 1 ? (
          <Icon outSize={"40px"} inSize={"32px"}></Icon>
        ) : (
          <Link to={urlNext}>
            <Icon outSize={"40px"} inSize={"32px"}>
              <UnionRight />
            </Icon>
          </Link>
        )}
      </ContentContainer>
      <Button to={`/home/${userPk}/last/letters/list`}>목록으로</Button>
    </Container>
  );
}
