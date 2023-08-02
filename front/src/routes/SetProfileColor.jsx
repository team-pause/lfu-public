import React, { useState } from "react";
import styled from "styled-components";
import Star1 from "../components/Star/Star1";
import Star2 from "../components/Star/Star2";
import Star3 from "../components/Star/Star3";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const AllStarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  margin-bottom: 24px;
`;

const FirstContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

  margin: 16px;
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

const Message = styled.div`
  bottom: 303px;
  font-family: "KIMM";
  font-size: 14px;
  color: var(--gray-400);
  text-align: center;
  line-height: 1.2;
`;

export default function SetProfileColor() {
  const [SelectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shape = searchParams.get("shape");
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const handleContainerClick = (container) => {
    setSelectedColor(container);
  };

  const renderStarComponent = (stopColor, stopColor2) => {
    // console.log("rendering" + stopColor + " " + stopColor2); // 디버그용
    switch (shape) {
      case "star1":
        return <Star1 stopColor={stopColor} stopColor2={stopColor2} />;
      case "star2":
        return <Star2 stopColor={stopColor} stopColor2={stopColor2} />;
      case "star3":
        return <Star3 stopColor={stopColor} stopColor2={stopColor2} />;
      default:
        return null;
    }
  };

  const handleButtonSubmit = () => {
    if (SelectedColor === null) {
      return; // Return early if no shape is selected
    }
    navigate(
      `/setprofile/complete1?name=${name}&shape=${shape}&color=${SelectedColor}&id=${id}`
    );
  };

  const isButtonDisabled = SelectedColor === null;

  return (
    <Container>
      <MessageTop>당신의 색을 선택해주세요.</MessageTop>

      <AllStarContainer>
        <FirstContainer>
          <StarContainerStyle
            isSelected={SelectedColor === 1}
            onClick={() => handleContainerClick(1)}
            key="1"
          >
            {renderStarComponent("#ffffff", "#f5fcfd")}
          </StarContainerStyle>
          <StarContainerStyle
            isSelected={SelectedColor === 2}
            onClick={() => handleContainerClick(2)}
            key="2"
          >
            {renderStarComponent("#ffffff", "#fff5f5")}
          </StarContainerStyle>
        </FirstContainer>

        <SecondContainer>
          <StarContainerStyle
            isSelected={SelectedColor === 3}
            onClick={() => handleContainerClick(3)}
            key="3"
          >
            {renderStarComponent("#ffffff", "#fffddd")}
          </StarContainerStyle>
          <StarContainerStyle
            isSelected={SelectedColor === 4}
            onClick={() => handleContainerClick(4)}
            key="4"
          >
            {renderStarComponent("#ffffff", "#e8ffeb")}
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
