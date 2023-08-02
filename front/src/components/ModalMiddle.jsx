import styled from "styled-components";
import Button from "../Atoms/Button";
import { useEffect } from "react";

const ModalWindow = styled.div``;

const ModalContainer = styled.div``;

// 코드 출처 https://joonfluence.tistory.com/m/657
// https://im-developer.tistory.com/201

/*
 * ModalBottom을 사용하려면 props로 toggleModal 함수를 전달해야 한다.
 * toggleModal은 state를 !state로 변경하는 함수다.
 * 모달이 켜지면 스크롤을 막아야 하는데, useEffect로 컴포넌트가 생성되면 스크롤을 막는다.
 * 그리고 useEffect의 반환값은 컴포넌트가 삭제될때 실행되는 함수인데, 모달이 사라지면 스크롤을 다시 허용한다.
 */

export default function ModalBottom(props) {
  const { toggleModal } = props;

  let scrollPosition = 0;

  useEffect(() => {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
      window.scrollTo(0, scrollPosition);
    };
  });

  return (
    <ModalWindow>
      <ModalContainer>
        <Button>프로필 수정</Button>
        <Button>로그아웃</Button>
        <Button>회원탈퇴</Button>
        <Button onClick={toggleModal}>취소</Button>
      </ModalContainer>
    </ModalWindow>
  );
}
