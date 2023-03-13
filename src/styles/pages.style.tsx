import styled from "styled-components";
import { device } from "../utils/constants";

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

export const ScrollView = styled(Container)`
  overflow-y: auto;
  height: calc(100vh - 60px);
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 15px;

  @media screen and (${device.mobileL}) {
    margin: 10px 30px;
  }

  @media screen and (${device.tablet}) {
    margin: 10px 20px;
  }
`;

export const Wrapper = styled.div`
  padding: 0 40px;
  margin-top: 42px;

  @media screen and (${device.laptop}) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;
