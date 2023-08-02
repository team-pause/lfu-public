import React, { useRef, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Star1 from "./Star/Star1";
import Star2 from "./Star/Star2";
import Star3 from "./Star/Star3";

const LinkLine = styled.line`
  stroke: #fdffc5;
  stroke-width: 2;
`;

export default function StarLink() {
  const star1Ref = useRef();
  const star2Ref = useRef();
  const [lineCoordinates, setLineCoordinates] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  useEffect(() => {
    if (star1Ref.current && star2Ref.current) {
      const star1 = star1Ref.current.getBoundingClientRect();
      const star2 = star2Ref.current.getBoundingClientRect();

      const x1 = star1.left + star1.width / 2;
      const y1 = star1.top + star1.height / 2;
      const x2 = star2.left + star2.width / 2;
      const y2 = star2.top + star2.height / 2;

      setLineCoordinates({ x1, y1, x2, y2 });
    }
  }, []);

  return (
    <>
      <Star1
        stopColor="#ff9531"
        positionStyles={{
          position: "abolute",
          left: "7.26%",
          right: "83.21%",
          top: "128.79%",
          bottom: "-49.36%",
        }}
        ref={star1Ref}
      />{" "}
      <Star2 stopColor="#f8ff22" ref={star2Ref} />
      <Star3 stopColor="#f8ff22" />
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <LinkLine {...lineCoordinates} />
      </svg>
    </>
  );
}
