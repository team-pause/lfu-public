import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyle = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const ButtonStyle = styled.button`
  width: 60%;
  height: 54px;
  background-color: transparent;

  border: 1px solid var(--gray-500);
  border-radius: 8px;

  color: var(--gray-500);
  font-family: "KIMM";
  font-size: 16px;

  &:hover {
    border: 1px solid var(--primary);
    background-color: var(--primary);
    color: var(--gray-200);
  }
`;

export default function Button(props) {
  return (
    <LinkStyle to={props.to}>
      <ButtonStyle onClick={props.onClick}>{props.children}</ButtonStyle>
    </LinkStyle>
  );
}
