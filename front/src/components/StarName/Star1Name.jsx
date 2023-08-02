import styled from "styled-components";

const Container = styled.div`
  width: 80px;
  height: 120px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const NameText = styled.text`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default function Star1Name({
  stopColor,
  stopColor2,
  name,
  textDecoration,
}) {
  //const truncatedName = name.length > 6 ? name.slice(0, 6) + "··" : name;

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
        height="120"
        viewBox="0 0 80 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ mixBlendMode: "color-dodge" }}>
          <rect
            width="80"
            height="80"
            transform="matrix(0 1 -1 0 80 0)"
            fill="black"
          />
          <ellipse
            cx="40"
            cy="39.9995"
            rx="4.25532"
            ry="40"
            transform="rotate(90 40 39.9995)"
            fill={`url(#paint0_radial_237_8679_${color})`}
          />
          <ellipse
            cx="40.0003"
            cy="40"
            rx="4.25532"
            ry="40"
            fill={`url(#paint1_radial_237_8679_${color})`}
          />
        </g>
        <defs>
          <radialGradient
            id={`paint0_radial_237_8679_${color}`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(40 39.9995) rotate(90) scale(40 4.25532)"
          >
            <stop offset="0.145833" stopColor={color} />
            <stop offset="1" stopColor={stopColor} stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={`paint1_radial_237_8679_${color}`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(40.0003 40) rotate(90) scale(40 4.25532)"
          >
            <stop offset="0.145833" stopColor={color} />
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
