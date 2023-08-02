import StarLetters from "../components/StarLetters";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import styled from "styled-components";
import Button from "../components/Button";
import UnionLeft from "../icon/UnionLeft";
import UnionRight from "../icon/UnionRight";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";
import Home from "./Home";
import { setUrl } from "../utils/setUrl";
import { setUrlFront } from "../utils/setUrlFront";

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

const NameContainer = styled.div`
  width: 100%;
`;

const StarNameStyle = styled.div`
  font-family: "KIMM";
  font-size: 24px;
  color: #f9fafb;
  text-align: center;

  border-bottom: 1px solid var(--primary);

  width: fit-content;
  margin: 0 auto;
`;

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function HomeId() {
  const { userPk } = useParams();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  //axios
  const [letters, setLetters] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  function checkLoading() {
    if (userPk && letters !== [] && user) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    axios.defaults.baseURL = `${setUrlFront}`;
    axios.defaults.withCredentials = true;
    axios
      .get(`${setUrl}/letter/user/${userPk}`)
      .then((response) => {
        setLetters(response.data); // Assuming the response contains an array of letters
        checkLoading();
      })
      .catch((error) => {
        console.error("homeId에서 setLetters 실패 : " + error);
      });
  }, [letters]);

  useEffect(() => {
    axios
      .get(`${setUrl}/user/id/${userPk}`)
      .then((response) => {
        setUser(response.data); // Assuming the response contains an array of letters
        checkLoading();
      })
      .catch((error) => {
        console.error("homeId에서 setUser 실패 : " + error);
        alert("해당되는 유저를 찾을 수 없습니다. 다시 시도해주세요.");
        navigate("/onBoarding");
      });
  }, [user]);

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
      {isLoading ? null : location.pathname === `/home/${userPk}` ? (
        checkLogin() && checkUser({ userPk }) ? (
          <Home />
        ) : (
          <Container>
            <NameContainer>
              <StarNameStyle>{`${user.nickname}`}</StarNameStyle>
            </NameContainer>

            <BodyContainer>
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
            </BodyContainer>

            <ButtonContainer>
              <Button to={"letter"}>별 편지 보내기</Button>
              <br></br>
              <Button to={"/onboarding"}>나도 별 만들기</Button>
            </ButtonContainer>

            <div
              style={{
                color: "#afafaf",
                fontSize: "13px",
                fontFamily: "Pretendard",
                fontWeight: 100,
                lineHeight: 1.4,
              }}
            >
              별 편지들은{" "}
              <p
                style={{ display: "inline", color: "#8c00ff", fontWeight: 500 }}
              >
                7월 7일{" "}
              </p>
              은하가 되어<br></br> {`${user.nickname}`}님에게 전해집니다! 🌌
            </div>
          </Container>
        )
      ) : (
        <Outlet />
      )}
    </>
  );
}
