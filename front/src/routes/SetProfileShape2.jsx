import React, { useState } from "react";
import styled from "styled-components";
import Star1 from "../components/Star/Star1";
import Star2 from "../components/Star/Star2";
import Star3 from "../components/Star/Star3";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const MessageTop = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "KIMM";
  font-size: 24px;
  color: var(--gray-200);
  text-align: center;
`;

const AllStarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const FirstContainer = styled.div``;

const SecondContainer = styled.div`
  display: inline-flex;
  width: 250px;
  place-content: space-between;
  margin-top: 26px;
`;

const StarContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  box-sizing: border-box;

  border: 1px solid
    ${({ isSelected }) => (isSelected ? "var(--primary)" : "#9ca3af")};
  border-radius: 12px;
  cursor: pointer;

  background-color: #030712;
  z-index: 999;

  &:hover {
    border-color: var(--primary);
  }
`;

const Message = styled.div`
  bottom: 303px;
  font-family: "KIMM";
  font-size: 14px;
  color: var(--gray-400);
  text-align: center;
  line-height: 1.2;
`;

export default function SetProfileShape2() {
  const [selectedShape, setSelectedShape] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };

  const handleButtonSubmit = () => {
    if (selectedShape === null) {
      return; // Return early if no shape is selected
    }
    navigate(`/setprofile/shape3?name=${name}&shape=${selectedShape}&id=${id}`);
  };

  const isButtonDisabled = selectedShape === null;

  return (
    <Container>
      <MessageTop>당신의 모양을 선택해주세요.</MessageTop>

      <AllStarContainer>
        <FirstContainer>
          <StarContainerStyle
            isSelected={selectedShape === "star2"}
            onClick={() => handleShapeSelect("star2")}
          >
            <Star2 stopColor="#ffffff" stopColor2="#fefefe" />
          </StarContainerStyle>
        </FirstContainer>

        <SecondContainer>
          <StarContainerStyle
            isSelected={selectedShape === "star1"}
            onClick={() => handleShapeSelect("star1")}
          >
            <Star1 stopColor="#ffffff" stopColor2="#ffffff" />
          </StarContainerStyle>
          <StarContainerStyle
            isSelected={selectedShape === "star3"}
            onClick={() => handleShapeSelect("star3")}
          >
            <Star3 stopColor="#ffffff" stopColor2="#ffffff" />
          </StarContainerStyle>
        </SecondContainer>
      </AllStarContainer>
      <Message>
        한 번 선택한 모양은
        <br />
        변경이 불가합니다.
        <br />
        <br />
        신중하게 선택해주세요.
      </Message>
      <Button onClick={handleButtonSubmit} disabled={isButtonDisabled}>
        선택 완료
      </Button>
    </Container>
  );
}
