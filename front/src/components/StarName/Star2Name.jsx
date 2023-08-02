import styled from "styled-components";

const Container = styled.div`
  width: 80px;
  height: 120px;
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;
`;

const NameText = styled.text`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default function Star2({ stopColor, stopColor2, name, textDecoration }) {
  let color;

  switch (stopColor2) {
    case "1":
      color = "#f5fcfd";
      break;
    case "2":
      color = "#fff5f5";
      break;
    case "3":
      color = "#fffddd";
      break;
    case "4":
      color = "#e8ffeb";
      break;
    default:
      color = "white"; // Default color if the value doesn't match any case
  }

  return (
    <Container>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ mixBlendMode: "color-dodge" }}>
          <rect width="80" height="80" fill="black" />
          <circle
            cx="40"
            cy="40"
            r="40"
            fill={`url(#paint0_radial_147_5461_${color})`}
          />
        </g>
        <defs>
          <radialGradient
            id={`paint0_radial_147_5461_${color}`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(40 40) rotate(90) scale(40)"
          >
            <stop offset="0.0729167" stopColor={color} />
            <stop offset="1" stopColor={stopColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <NameText
          x="50%"
          y="70"
          fontFamily="Gangwon"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          textDecoration={textDecoration}
        >
          {name}
        </NameText>
      </svg>
    </Container>
  );
}
