import styled from "styled-components";

const LogoStyle = styled.svg`
  width: 32px;
  height: 32px;
`;

export default function Logo({ svg }) {
  return (
    <div>
      <LogoStyle>
        {/* #logo는 svg 내의 symbol id를 어떻게 하냐에 따라 다름 */}
        <use xlinkhref={svg + "#logo"} />
      </LogoStyle>
    </div>
  );
}
