import Header from "../components/Header";
import StarLetters from "../components/StarLetters";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import styled from "styled-components";
import UnionLeft from "../icon/UnionLeft";
import UnionRight from "../icon/UnionRight";
import { useState } from "react";
import { useEffect } from "react";
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
  justify-content: space-evenly;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 10%;
  /* width: 100%; */
  height: 100%;
  color: var(--gray-400);
`;

export default function HomeLetters() {
  // 첫 랜더링 시 값 아직 못 받았으면 계속 로딩 -> 그래서 true
  const [isLoading, setIsLoading] = useState(true);

  const { userPk } = useParams();
  const navigate = useNavigate();

  //사람들이 남긴 별의 개수를 가져온다.
  const [letters, setLetters] = useState([]);

  function checkLoading() {
    if (letters !== []) {
      setIsLoading(false);
    }
  }

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
    <>
      {isLoading ? null : (
        <>
          <Container>
            <Header location={`/home/${userPk}`}></Header>
            <Body>
              {state > 0 ? (
                <Icon
                  outSize={"40px"}
                  inSize={"32px"}
                  clickEvent={onPrevClicked}
                >
                  <UnionLeft />
                </Icon>
              ) : (
                <Icon outSize={"40px"} inSize={"32px"}></Icon>
              )}
              <StarLetters state={state} userPk={userPk} />
              {Math.floor((letterNum - 1) / 6) === state || letterNum === 0 ? (
                <Icon outSize={"40px"} inSize={"32px"}></Icon>
              ) : (
                <Icon
                  outSize={"40px"}
                  inSize={"32px"}
                  clickEvent={onNextClicked}
                >
                  <UnionRight />
                </Icon>
              )}
            </Body>
            {letterNum !== 0 ? (
              <Message>
                <div>{letterNum}개의 별 편지가 모였습니다.</div>
              </Message>
            ) : (
              <Message>
                <div>아직 받은 별 편지가 없습니다.</div>
              </Message>
            )}
          </Container>
        </>
      )}
    </>
  );
}
