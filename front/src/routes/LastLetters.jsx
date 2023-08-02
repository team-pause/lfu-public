import Header from "../components/Header";
import StarLetters from "../components/StarLetters";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import styled from "styled-components";
import Button from "../components/Button";
import { dataLetters } from "../db";
import UnionLeft from "../icon/UnionLeft";
import UnionRight from "../icon/UnionRight";
import { useState, useEffect } from "react";
import axios from "axios";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";
import { setUrl } from "../utils/setUrl";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default function LastLetters() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { userPk } = useParams();

  //사람들이 남긴 별의 개수를 가져온다.
  const [letters, setLetters] = useState([]);

  function checkLoading() {
    if (userPk && letters) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    axios.get(`${setUrl}/user`).then((response) => {
      if (response.data[0].ddayLogin === false) {
        alert("아직 별을 확인할 수 없습니다.");
        navigate("/onBoarding");
      }
    });
  });

  useEffect(() => {
    axios
      .get(`${setUrl}/letter/user/${userPk}`)
      .then((response) => {
        setLetters(response.data); // Assuming the response contains an array of letters
        checkLoading();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

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

  const letterNum = letters.length;

  const [state, setState] = useState(0);

  const onPrevClicked = () => {
    setState((prev) => prev - 1);
  };

  const onNextClicked = () => {
    setState((prev) => prev + 1);
  };

  return (
    <Container>
      {isLoading ? null : (
        <>
          <Header location={`/home/${userPk}`}></Header>

          <Body>
            {state > 0 ? (
              <Icon outSize={"40px"} inSize={"32px"} clickEvent={onPrevClicked}>
                <UnionLeft />
              </Icon>
            ) : (
              <Icon outSize={"40px"} inSize={"32px"}></Icon>
            )}

            <StarLetters state={state} userPk={userPk} />

            {Math.floor((letterNum - 1) / 6) === state || letterNum === 0 ? (
              <Icon outSize={"40px"} inSize={"32px"}></Icon>
            ) : (
              <Icon outSize={"40px"} inSize={"32px"} clickEvent={onNextClicked}>
                <UnionRight />
              </Icon>
            )}
          </Body>

          <ButtonContainer>
            <Button to={`list`}>편지 확인하기</Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}
