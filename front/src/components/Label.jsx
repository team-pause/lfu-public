import styled from "styled-components";

const LabelStyled = styled.label`
  font-size: var(--mobile-label);
  color: ${(props) => props.color};
  weight: 300;
  word-break: break-all;
`;

export default function Label({ children, color }) {
  return <LabelStyled color={color}>{children}</LabelStyled>;
}
