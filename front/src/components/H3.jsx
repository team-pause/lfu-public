import styled from "styled-components";

const H3Styled = styled.h3`
  font-size: var(--mobile-h3);
  font-weight: 700;
  color: ${(props) => props.color};
  word-break: break-all;
`;

export default function H3({ children, color }) {
  return <H3Styled color={color}>{children}</H3Styled>;
}
