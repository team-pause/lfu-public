import styled from "styled-components";
import ButtonKakao from "../components/ButtonKakao";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(180deg, #000000 0%, #151c2b 58.33%, #271e3a 100%);
`;

const H2Container = styled.div`
  margin-top: 94px;
`;

const SocialLoginButtonContainer = styled.div`
  /* left: 50%; */
  margin-top: 140px;
`;
const H2Style = styled.h2`
  width: fit-content;
  margin: 0 auto;
  font-family: "KIMM";
  font-size: 36px;
  color: #ffffff;
  white-space: pre-line; // styled component 개행 적용법
`;

const H2Box = styled.div`
  margin: 0 auto;
`;

export default function Login() {
  return (
    <Container>
      <H2Container>
        <H2Box>
          <H2Style>
            LETTERS
            <br />
            FROM
            <br />
            THE UNIVERSE.
          </H2Style>
        </H2Box>
      </H2Container>
      <SocialLoginButtonContainer>
        <ButtonKakao />
      </SocialLoginButtonContainer>
    </Container>
  );
}
