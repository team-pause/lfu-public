export default function Star2({ stopColor, stopColor2 }) {
  return (
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
          fill={`url(#paint0_radial_147_5461_${stopColor2})`}
        />
      </g>
      <defs>
        <radialGradient
          id={`paint0_radial_147_5461_${stopColor2}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(40 40) rotate(90) scale(40)"
        >
          <stop offset="0.0729167" stopColor={stopColor2} />
          <stop offset="1" stopColor={stopColor} stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
