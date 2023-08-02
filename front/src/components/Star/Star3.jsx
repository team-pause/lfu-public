export default function Star3({ stopColor, stopColor2 }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
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
          transform="rotate(135 40 39.9995)" // 변경된 부분: rotate(135 40 39.9995)
          fill={`url(#paint0_radial_237_8679_${stopColor2})`}
        />
        <ellipse
          cx="40.0003"
          cy="40"
          rx="4.25532"
          ry="40"
          transform="rotate(45 40.0003 40)" // 변경된 부분: rotate(45 40.0003 40)
          fill={`url(#paint1_radial_237_8679_${stopColor2})`}
        />
      </g>
      <defs>
        <radialGradient
          id={`paint0_radial_237_8679_${stopColor2}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(40 39.9995) rotate(90) scale(40 4.25532)"
        >
          <stop offset="0.145833" stopColor={stopColor2} />
          <stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`paint1_radial_237_8679_${stopColor2}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(40.0003 40) rotate(90) scale(40 4.25532)"
        >
          <stop offset="0.145833" stopColor={stopColor2} />
          <stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
