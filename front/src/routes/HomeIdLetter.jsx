import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Star2 from "../components/Star/Star2";
import Star3 from "../components/Star/Star3";
import Star1 from "../components/Star/Star1";
import axios from "axios";

import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ToContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-bottom: 1px solid var(--primary);
  margin-bottom: 32px;
`;

const To = styled.div`
  color: var(--primary);
  font-size: 24px;
`;

const Name = styled.div`
  color: var(--gray-200);
  font-size: 24px;
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

  z-index: 99;
  background-color: #030712;

  &:hover {
    border-color: var(--primary);
  }

  margin: 12px 12px 12px 12px;
`;

const ShapeChoiceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ChoiceMessage = styled.div`
  color: var(--gray-200);
  font-size: 16px;
`;
const AllShapeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorChoiceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AllColorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ColorContainer1 = styled.div`
  display: flex;
`;

export default function HomeIdLetter() {
  const { userPk } = useParams();

  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();

  const handleShapeSelect = (shape) => {
    setSelectedShape(shape);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const renderStarComponent = (color) => {
    switch (selectedShape) {
      case "star1":
        return <Star1 stopColor={"#ffffff"} stopColor2={color} />;
      case "star2":
        return <Star2 stopColor={"#ffffff"} stopColor2={color} />;
      case "star3":
        return <Star3 stopColor={"#ffffff"} stopColor2={color} />;
      default:
        return null;
    }
  };

  const handleButtonSubmit = () => {
    if (selectedColor === null || selectedShape === null) {
      return; // Return early if no shape is selected
    }
    navigate(
      `/home/${userPk}/write?shape=${selectedShape}&color=${selectedColor}`
    );
  };

  const isButtonDisabled = selectedColor === null || selectedShape === null;

  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`${setUrl}/user/id/${userPk}`)
      .then((response) => {
        setUser(response.data); // Assuming the response contains an array of letters
      })
      .catch((error) => {
        console.error("homeId에서 setUser 실패 : " + error);
      });
  }, []);

  return (
    <Container>
      <Header location={`/home/${userPk}`} />
      <ToContainer>
        <To>To.&nbsp;</To>
        <Name>{`${user.nickname} `}</Name>
      </ToContainer>

      <ShapeChoiceContainer>
        <ChoiceMessage>당신이 보내고 싶은 별 편지의 모양은?</ChoiceMessage>
        <AllShapeContainer>
          <StarContainerStyle
            isSelected={selectedShape === "star1"}
            onClick={() => handleShapeSelect("star1")}
          >
            <Star1 stopColor={"white"} stopColor2={"white"} />
          </StarContainerStyle>
          <StarContainerStyle
            isSelected={selectedShape === "star2"}
            onClick={() => handleShapeSelect("star2")}
          >
            <Star2 stopColor={"white"} stopColor2={"white"} />
          </StarContainerStyle>
          <StarContainerStyle
            isSelected={selectedShape === "star3"}
            onClick={() => handleShapeSelect("star3")}
          >
            <Star3 stopColor={"white"} stopColor2={"white"} />
          </StarContainerStyle>
        </AllShapeContainer>
      </ShapeChoiceContainer>

      <ColorChoiceContainer>
        <ChoiceMessage>당신이 보내고 싶은 별 편지의 색깔은?</ChoiceMessage>
        <AllColorContainer>
          <ColorContainer1>
            <StarContainerStyle
              isSelected={selectedColor === 1}
              onClick={() => handleColorSelect(1)}
            >
              {renderStarComponent("#f5fcfd")}
            </StarContainerStyle>
            <StarContainerStyle
              isSelected={selectedColor === 2}
              onClick={() => handleColorSelect(2)}
            >
              {renderStarComponent("#fff5f5")}
            </StarContainerStyle>
          </ColorContainer1>
          <ColorContainer1>
            <StarContainerStyle
              isSelected={selectedColor === 3}
              onClick={() => handleColorSelect(3)}
            >
              {renderStarComponent("#fffddd")}
            </StarContainerStyle>
            <StarContainerStyle
              isSelected={selectedColor === 4}
              onClick={() => handleColorSelect(4)}
            >
              {renderStarComponent("#e8ffeb")}
            </StarContainerStyle>
          </ColorContainer1>
        </AllColorContainer>
      </ColorChoiceContainer>

      <Button onClick={handleButtonSubmit} disabled={isButtonDisabled}>
        다음으로
      </Button>
    </Container>
  );
}
