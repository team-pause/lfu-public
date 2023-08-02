import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function LinkLine(props) {
  const { parentX, parentY, childX, childY } = props; // props로부터 값 추출

  return (
    <Container>
      <svg width="100%" height="100%">
        <path
          d={`M${parentX} ${parentY} L ${childX} ${childY}`}
          //fill="transparent"
          strokeWidth="4"
          stroke="#f3f3f3"
        />
      </svg>
    </Container>
  );
}
