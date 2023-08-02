import styled from "styled-components";
import Star1Name from "./StarName/Star1Name";
import Star2Name from "./StarName/Star2Name";
import Star3Name from "./StarName/Star3Name";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { setUrl } from "../utils/setUrl";

//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
//https://bum-developer.tistory.com/entry/React-React%EC%99%80-Canvas%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%9B%80%EC%A7%81%EC%9D%B4%EB%8A%94-%EA%B3%B5-%EB%A7%8C%EB%93%A4%EA%B8%B0

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FirstContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const SecondContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ThirdContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #030712;
  z-index: 999;
`;

const MeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #030712;
  z-index: 999;
`;

export default function StarLetters({ state, userPk }) {
  //axios
  const [user, setUser] = useState("");
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    axios
      .get(`${setUrl}/letter/user/${userPk}`)
      .then((response) => {
        setLetters(response.data); // Assuming the response contains an array of letters
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${setUrl}/user/id/${userPk}`)
      .then((response) => {
        setUser(response.data); // Assuming the response contains an array of letters
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderStar = () => {
    return letters.map((letter, idx) => {
      if (letter.shape === "star1") {
        return (
          <Star1Name
            key={letter.id}
            name={`${letter.sendUserName}`}
            stopColor={"white"}
            stopColor2={`${letter.color}`}
          />
        );
      } else if (letter.shape === "star2") {
        return (
          <Star2Name
            key={letter.id}
            name={`${letter.sendUserName}`}
            stopColor={"white"}
            stopColor2={`${letter.color}`}
          />
        );
      } else if (letter.shape === "star3") {
        return (
          <Star3Name
            key={letter.id}
            name={`${letter.sendUserName}`}
            stopColor={"white"}
            stopColor2={`${letter.color}`}
          />
        );
      }
      return null;
    });
  };
  const renderedStars = renderStar();

  const renderStarMe = () => {
    switch (user.shape) {
      case "star1":
        return (
          <Star1Name
            stopColor="white"
            stopColor2={user.color}
            name={user.nickname}
            textDecoration={"underline"}
          />
        );
      case "star2":
        return (
          <Star2Name
            stopColor="white"
            stopColor2={user.color}
            name={user.nickname}
            textDecoration={"underline"}
          />
        );
      case "star3":
        return (
          <Star3Name
            stopColor="white"
            stopColor2={user.color}
            name={user.nickname}
            textDecoration={"underline"}
          />
        );
      default:
        return (
          <Star1Name
            stopColor="white"
            stopColor2={user.color}
            name={user.nickname}
            textDecoration={"underline"}
          />
        );
    }
  };
  const renderedStarMe = renderStarMe();

  return (
    <Container>
      <FirstContainer>
        <StarContainer>{renderedStars[state * 6]}</StarContainer>
        <StarContainer>{renderedStars[state * 6 + 1]}</StarContainer>
      </FirstContainer>
      <SecondContainer>
        <StarContainer>{renderedStars[state * 6 + 2]}</StarContainer>
        <MeContainer>{renderedStarMe}</MeContainer>
        <StarContainer>{renderedStars[state * 6 + 3]}</StarContainer>
      </SecondContainer>
      <ThirdContainer>
        <StarContainer>{renderedStars[state * 6 + 4]}</StarContainer>
        <StarContainer>{renderedStars[state * 6 + 5]}</StarContainer>
      </ThirdContainer>
    </Container>
  );
}
