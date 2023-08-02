import React from "react";
import styled from "styled-components";
import Star2 from "../components/Star/Star2";
import Star1 from "../components/Star/Star1";
import Star3 from "../components/Star/Star3";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";
import axios from "axios";
import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StarContainer = styled(motion.div)`
  margin-bottom: 40px;
  z-index: 999;
  background-color: #030712;
`;

const MessageContainer = styled.div`
  bottom: 303px;
  font-family: "KIMM";
  font-size: 24px;
  color: #4b5563;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40px;
`;

const SelectedNameText = styled.span``;

const SelectedShapeText = styled.span`
  color: #f9fafb;
`;

const SelectedColorText = styled.span`
  color: #f9fafb;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function SetProfileComplete1() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const shape = searchParams.get("shape");
  const color = searchParams.get("color");
  const id = searchParams.get("id");

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

  const renderStarShape = () => {
    switch (shape) {
      case "star1":
        return "십자";
      case "star2":
        return "동그란";
      case "star3":
        return "엑스";
      default:
        return null;
    }
  };

  const renderStarColor = () => {
    switch (color) {
      case "1":
        return "푸르른";
      case "2":
        return "분홍빛";
      case "3":
        return "노란빛";
      case "4":
        return "초록빛";
      default:
        return "";
    }
  };

  const onClick = () => {
    const registerUser = async () => {
      await axios
        .post(`${setUrl}/user`, {
          kakaoId: id,
          nickname: name,
          shape: shape,
          color: color,
        })
        .then(function (response) {
          navigate(
            `/setprofile/complete2?name=${name}&shape=${shape}&color=${color}&id=${id}`
          );
        })
        .catch(function (error) {
          console.error(error);
          alert(
            `이미 존재하는 회원이거나 비정상적 접근입니다. 다시 시도해주세요`
          );
          navigate("/onBoarding");
        });
    };
    registerUser();
  };

  return (
    <Container>
      <StarContainer>{renderStarComponent()}</StarContainer>

      <MessageContainer>
        <SelectedNameText>{name} 님은</SelectedNameText>
        <br></br>
        <SelectedColorText>{renderStarColor()} &nbsp;</SelectedColorText>
        <SelectedShapeText>{renderStarShape()}</SelectedShapeText>
        <span>별 입니다.</span>
      </MessageContainer>

      <ButtonContainer>
        <Button onClick={onClick}>마음에 들어요!</Button>
        <br></br>
        <br></br>

        <Button to="/setprofile/name"> 다시 정할래요!</Button>
      </ButtonContainer>
    </Container>
  );
}
