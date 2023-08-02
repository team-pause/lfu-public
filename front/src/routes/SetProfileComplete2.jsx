import React from "react";
import styled from "styled-components";
import Star2 from "../components/Star/Star2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Star1 from "../components/Star/Star1";
import Star3 from "../components/Star/Star3";
import axios from "axios";

import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 70vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30vh;
`;

const FirstContainer = styled.div`
  margin-top: 20px;
  z-index: 999;
  background-color: #030712;
`;

const MessageContainer = styled.div`
  bottom: 303px;
  font-family: "KIMM";

  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.06em;

  margin-bottom: 20px;
`;

const Message = styled.span`
  font-size: 24px;
  color: var(--gray-200);
`;

const LinkStyle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: var(--gray-600);
  font-family: "KIMM";
  font-size: 16px;

  &:hover {
    color: var(--primary);
  }
  &:active {
    color: var(--primary);
  }
`;

const LabelStyle = styled.label``;

export default function SetProfileComplete2() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const shape = searchParams.get("shape");
  const color = searchParams.get("color");
  const id = searchParams.get("id");
  // console.log("name: " + name); // 디버그용
  // console.log("shape: " + shape); // 디버그용
  // console.log("color: " + color); // 디버그용
  // console.log("id: " + id); // 디버그용

  const colorSelect = () => {
    switch (color) {
      case "1":
        return "#f5fcfd";
      case "2":
        return "#fff5f5";
      case "3":
        return "#fffddd";
      case "4":
        return "#e8ffeb";
      default:
        return "";
    }
  };

  function onLogin(kakaoId) {
    axios
      .get(`${setUrl}/user/login?kakaoId=${kakaoId}`)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;

        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((error) => {
        // ... 에러 처리
        console.error("error: " + error);
        alert(
          `이미 존재하는 회원이거나 비정상적 접근입니다. 다시 시도해주세요.`
        );
        navigate("/onBoarding");
      });
  }

  const renderStarComponent = () => {
    switch (shape) {
      case "star1":
        return <Star1 stopColor={"#ffffff"} stopColor2={colorSelect()} />;
      case "star2":
        return <Star2 stopColor={"#ffffff"} stopColor2={colorSelect()} />;
      case "star3":
        return <Star3 stopColor={"#ffffff"} stopColor2={colorSelect()} />;
      default:
        return null;
    }
  };

  const onClick = () => {
    const getUser = async () => {
      await axios
        .get(`${setUrl}/user/kakao/${id}`)
        .then((res) => {
          // console.log("data확인: " + JSON.stringify(res.data)); // 디버그용
          const user = res.data;
          if (user === undefined) {
            alert("유저 조회 실패. 다시 로그인하세요!");
            navigate(`/login`);
          } else {
            onLogin(id);
            localStorage.setItem("userId", user.id);
            navigate(`/home/${user.id}`);
          }
        })
        .catch(function (error) {
          console.error(error);
          alert(
            `이미 존재하는 회원이거나 비정상적 접근입니다. 다시 시도해주세요.`
          );
          navigate("/onBoarding");
        });
    };
    getUser();
  };
  return (
    <Container>
      <FirstContainer>{renderStarComponent()}</FirstContainer>
      <MessageContainer>
        <Message>
          예쁜 별이네요!<br></br>이제 별을 모으러 가볼까요?
          <br></br>
        </Message>
      </MessageContainer>
      <LinkStyle onClick={onClick}>
        <LabelStyle>눌러서 계속</LabelStyle>
      </LinkStyle>
    </Container>
  );
}
