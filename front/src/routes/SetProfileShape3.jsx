import React from "react";
import styled from "styled-components";
import Star1 from "../components/Star/Star1";
import Star2 from "../components/Star/Star2";
import Star3 from "../components/Star/Star3";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const SetProfileShapeStyle = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FirstContainer = styled.div`
  margin-bottom: 40px;

  background-color: #030712;
  z-index: 999;
`;

const Message = styled.div`
  margin-bottom: 40px;
  bottom: 303px;
  font-family: "KIMM";
  font-size: 24px;
  color: #4b5563;
  text-align: center;
  line-height: 1.5;
`;

const SelectedShapeText = styled.span`
  color: #f9fafb;
  font-family: "KIMM";
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function SetProfileShape3() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shape = searchParams.get("shape");
  const id = searchParams.get("id");

  let selectedStarComponent;

  if (shape === "star1") {
    selectedStarComponent = <Star1 stopColor="#ffffff" stopColor2="#ffffff" />;
  } else if (shape === "star2") {
    selectedStarComponent = <Star2 stopColor="#ffffff" stopColor2="#fefefe" />;
  } else if (shape === "star3") {
    selectedStarComponent = <Star3 stopColor="#ffffff" stopColor2="#ffffff" />;
  }

  const navigate = useNavigate();
  const name = searchParams.get("name");

  const handleButtonSubmit = () => {
    navigate(`/setprofile/color?name=${name}&shape=${shape}&id=${id}`);
  };

  return (
    <SetProfileShapeStyle>
      <FirstContainer>{selectedStarComponent}</FirstContainer>
      <Message>
        <SelectedShapeText>
          {shape === "star1"
            ? "십자 별"
            : shape === "star2"
            ? "둥근 별"
            : shape === "star3"
            ? "엑스 별"
            : ""}
        </SelectedShapeText>
        <span>을</span>
        <br />
        선택하셨습니다.
      </Message>
      <ButtonContainer>
        <Button onClick={handleButtonSubmit}>다음으로</Button>
        <br></br>
        <br></br>
        <Button>이전으로</Button>
      </ButtonContainer>
    </SetProfileShapeStyle>
  );
}
