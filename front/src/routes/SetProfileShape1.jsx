import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40vh;
`;

const StyledP = styled.p`
  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 24px;

  line-height: 36px;
  text-align: center;
  letter-spacing: 0.07em;
`;

const LinkStyle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: var(--gray-600);
  font-family: "KIMM";
  font-size: 16px;

  position: fixed;
  top: 60%;

  &:hover {
    color: var(--primary);
  }
  &:active {
    color: var(--primary);
  }
`;

const LabelStyle = styled.label``;

const AnimatedP = styled(motion.p)`
  color: var(--gray-300);
  font-family: "KIMM";
  font-size: 24px;
`;

export default function SetProfileShape1() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  const nextLocation = {
    pathname: "/setprofile/shape2",
    search: location.search,
  };

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <AnimatedP
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {name && <StyledP>{name}님 안녕하세요.</StyledP>}
      </AnimatedP>
      {showMessage && (
        <AnimatedP
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <StyledP>나만의 별을 만들고</StyledP>
          <StyledP>별 편지를 모아보세요.</StyledP>
        </AnimatedP>
      )}
      <LinkStyle to={nextLocation}>
        <LabelStyle>눌러서 계속</LabelStyle>
      </LinkStyle>
    </Container>
  );
}
