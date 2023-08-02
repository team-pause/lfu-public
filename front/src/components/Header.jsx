import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Back from "../icon/Back";
import Icon from "./Icon";

const HeaderStyle = styled.div`
  height: 48px;
  width: 100%;
  flex-shrink: 0;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 24px;
  z-index: 99;
`;

const ClickContainer = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

export default function Header({ location }) {
  const navigate = useNavigate();

  const handleLocation = () => {
    navigate(location);
  };

  return (
    <HeaderStyle>
      <ClickContainer onClick={handleLocation}>
        <Icon inSize="24px" outSize="36px">
          <Back />
        </Icon>
      </ClickContainer>
    </HeaderStyle>
  );
}
