import styled from "styled-components";

interface styledPage {
  height?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalBar = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const Divider = styled.div`
  height: 2px;
  margin-top: 15px;
  background: #ececf1;
`;

interface styledIcon {
  rotate?: string;
  size?: string;
  color?: string;
  marginTop?: string;
}

export const Icon = styled.i<styledIcon>`
  display: flex;
  rotate: ${(props) => props.rotate};
  color: ${(props) => (props.color ? props.theme.colors.primary : "#0e2127")};
  min-width: 48px;
  font-size: ${(props) => (props.size ? props.size : "48px")};
  margin-top: ${(props) => props.marginTop};
  background-color: transparent;
  background: transparent;
  justify-content: center;
`;

export const IconContainer = styled(Container)`
  flex: 1;
  margin-bottom: 12px;
`;

export const ImgContainer = styled.div<{ size: string }>`
  position: relative;
  display: flex;
  min-width: ${(props) => props.size};
  margin-right: 20px;
`;

export const Page = styled(Container)<styledPage>`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 20px;
  height: auto;
`;

export const View = styled(Container)`
  margin: 10px 15px 10px 0px;

  @media (max-width: 768px) {
    margin: 0px 0px;
  }
`;
