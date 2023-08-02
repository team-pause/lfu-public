import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import X from "../icon/X";
import Icon from "./Icon";

const Container = styled.div``;

const SideBar = styled.div`
  background-color: var(--primary);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: var(--gray-50);
  height: 100%;
  //width: 320px;
  z-index: 999;
`;

const ButtonStyle = styled.div`
  /* display: flex;
  justify-content: center; */

  position: relative;
  left: -50px;
  top: 10px;
  width: 40px;
  height: 40px;

  z-index: 99;
  transition: 0.8s ease;

  overflow: hidden;
  cursor: pointer;

  pointer-events: auto;
`;

const Content = styled.div`
  padding: 40px 40px 0 20px;
  position: relative;
  width: 100%;
`;

export default function Sidebar({ width, children }) {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    // console.log("toggleMenu called");
    // console.log(xPosition);
    if (xPosition < 0) {
      setX(0); // 안돼
      setOpen(() => true); //안돼
      // testOpen = true; //된다.
      // console.log(testOpen);
      // forceUpdate();
      // ReactDOM.render();
      // console.log(xPosition);
      // console.log(isOpen); //돼
      // console.log("toggleMenu called2"); //돼
    } else {
      setX(-width);
      setOpen(false);
      // testOpen = false; //된다.
      // console.log(testOpen);
      // forceUpdate();

      // console.log(xPosition);
      // console.log("toggleMenu called3");
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      setX(-width);
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <Container>
      <SideBar
        ref={side}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <ButtonStyle onClick={() => toggleMenu()}>
          {isOpen ? (
            <Icon inSize={"24px"} outSize={"36px"}>
              <X />
            </Icon>
          ) : (
            <Icon
              inSize={"24px"}
              outSize={"36px"}
              color="#6F19FF"
              fontsize={"24px"}
            >
              ≡
            </Icon>
          )}
        </ButtonStyle>

        <Content>{children}</Content>
      </SideBar>
    </Container>
  );
}
