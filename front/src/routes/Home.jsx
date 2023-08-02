import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Arrow from "../icon/Arrow";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ShareModal from "../components/ShareModal";
import ShareModal2 from "../components/ShareModal2";

import axios from "axios";
import Star1Name from "../components/StarName/Star1Name";
import Star2Name from "../components/StarName/Star2Name";
import Star3Name from "../components/StarName/Star3Name";
import Question from "../icon/Question";

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

const Header = styled.div``;

const MeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StarNameContainer = styled.div`
  width: 100%;
`;

const StarNameStyle = styled.div`
  font-family: "KIMM";
  font-size: 24px;
  //line-height: 2; /* Increase the line spacing as desired */

  color: #f9fafb;
  text-align: center;

  border-bottom: 1px solid var(--primary);

  width: fit-content;
  margin: 0 auto;
`;

const StoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClickHereContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-right: 150px;
`;

const ClickHereMessageStyle = styled.div`
  font-family: "Gangwon";
  font-size: 13px;
  color: #f9fafb;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 80px;

  background-color: #030712;
  z-index: 990;
`;

const StoryStyle = styled.div`
  font-family: "KIMM";
  font-size: 14px;
  color: var(--gray-500);
  text-align: left;
  letter-spacing: 0.1em;
  line-height: 1.7;
`;

const LinkStyle = styled(Link)`
  color: var(--gray-300);
  text-decoration: none;
`;

const InfoStyle = styled.div`
  color: var(--gray-400);
  font-size: 12px;
  font-family: "noto-light";
  position: fixed;
  bottom: 7%;
`;

const QuestionContainer = styled.div`
  display: inline;
`;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // 공유하기
  const [isOpen2, setIsOpen2] = useState(false); // 채널추가

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const openModalHandler2 = () => {
    setIsOpen2(!isOpen2);
  };

  const { userPk } = useParams();
  const navigate = useNavigate();

  //axios
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  function checkLoading() {
    if (userPk && user) {
      setIsLoading(false);
    }
  }

  const toLetters = () => {
    if (user.ddayLogin === false) {
      navigate(`letters`);
    } else {
      navigate(`last/letters`);
    }
  };

  useEffect(() => {
    axios
      .get(`${setUrl}/user/id/${userPk}`)
      .then((response) => {
        setUser(response.data); // Assuming the response contains an array of letters
        checkLoading();
      })
      .catch((error) => {
        console.error("homeId에서 setUser 실패 : " + error);
      });
  }, [user]);

  const renderStarMe = () => {
    switch (user.shape) {
      case "star1":
        return (
          <Star1Name stopColor="white" stopColor2={user.color} name="Me" />
        );
      case "star2":
        return (
          <Star2Name stopColor="white" stopColor2={user.color} name="Me" />
        );
      case "star3":
        return (
          <Star3Name stopColor="white" stopColor2={user.color} name="Me" />
        );
      default:
        return (
          <Star1Name stopColor="white" stopColor2={user.color} name="Me" />
        );
    }
  };
  const renderedStarMe = renderStarMe();

  return (
    <Container>
      {isLoading ? null : (
        <>
          <Header>
            <Sidebar width={180}>
              <LinkStyle to={`/withdraw/${userPk}`}>탈퇴하기</LinkStyle>
              <InfoStyle>
                문의사항 <br></br>teampause77@gmail.com
                <br></br>
                <br></br>
                카카오 채널 <br></br>
                우주에서온편지
              </InfoStyle>
            </Sidebar>
          </Header>
          <BodyContainer>
            <StarNameContainer>
              <StarNameStyle>{`${user.nickname}`}</StarNameStyle>
            </StarNameContainer>

            <StoryContainer>
              <ClickHereContainer>
                <ClickHereMessageStyle>
                  눌러서 편지 확인! &nbsp;
                </ClickHereMessageStyle>
                <Arrow />
              </ClickHereContainer>
              <StarContainer>
                <LinkStyle onClick={toLetters}>
                  <MeContainer>{renderedStarMe}</MeContainer>
                </LinkStyle>
              </StarContainer>
              <StoryStyle>
                {/* 알림 ) <br /> */}
                내가 받은 편지의 내용은
                <br />
                7월 7일에 확인하실 수 있습니다.{" "}
                <QuestionContainer onClick={openModalHandler2}>
                  <Question />
                </QuestionContainer>
              </StoryStyle>
            </StoryContainer>
            <Button onClick={openModalHandler}>내가 있는 곳 공유하기</Button>
          </BodyContainer>
        </>
      )}

      {isOpen && <ShareModal onClick={openModalHandler} />}
      {isOpen2 && (
        <ShareModal2 onClick={openModalHandler2} userNickname={user.nickname} />
      )}
    </Container>
  );
}
