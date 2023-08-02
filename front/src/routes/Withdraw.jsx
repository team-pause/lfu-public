import styled from "styled-components";
import Button from "../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { setUrl } from "../utils/setUrl";
import checkLogin from "../utils/auth/checkLogin";
import checkUser from "../utils/auth/checkUser";
import { useEffect } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Message = styled.div`
  font-family: "KIMM";
  font-size: 36px;
  color: var(--gray-100);
  text-align: center;
`;

const LeaveMessage = styled.span`
  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 20px;

  line-height: 25px;
  letter-spacing: 0.05em;
`;

const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LinkLeave = styled(Link)`
  font-family: "KIMM";
  font-size: 14px;
  color: var(--gray-500);
  background-color: transparent;
  margin-top: 24px;
  text-decoration: none;
  :hover {
    color: var(--primary);
  }
`;

export default function Withdraw() {
  const { userPk } = useParams();
  const navigate = useNavigate();

  const handleWithdraw = () => {
    axios
      .delete(`${setUrl}/user/withdraw/${userPk}`)
      .then((response) => {
        // console.log("Withdrawal request sent successfully."); // 디버그용
        // console.log("HTTP response code:", response.status); // 디버그용
        navigate("complete");
      })
      .catch((error) => {
        console.error("Withdrawal request failed:", error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      alert("로그인 후 접속 가능한 화면입니다.");
      navigate("/onBoarding");
    } else if (checkLogin() && checkUser({ userPk })) {
    } else {
      alert("회원만 탈퇴가 가능합니다.");
      navigate("/onBoarding");
    }
  });

  return (
    <Container>
      <Header location={`/home/${userPk}`}></Header>

      <Message>떠나니...?</Message>
      <LeaveMessage>
        떠나는 즉시 모든 정보는<br></br>
        안전하게 삭제됩니다.
        <br />
        <br />
        그러나 다시는 복구가 불가능합니다.
        <br />
        <br />
        정말로 떠나시겠습니까?
      </LeaveMessage>
      <ButtonContainer>
        <Button to={`/home/${userPk}`}>서비스 계속 이용하기</Button>
        <LinkLeave onClick={handleWithdraw}>떠나버리기</LinkLeave>
      </ButtonContainer>
    </Container>
  );
}
