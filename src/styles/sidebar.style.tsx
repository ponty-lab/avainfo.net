import styled, { ThemeConsumer } from "styled-components";
import { hexToRGB } from "../utils/hexToRGB";
import AvaColors from "./colors.style";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalBar = styled.div<{ background?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 1;
  background: ${(props) =>
    props.background ? props.theme.accentColor : "white"};
`;

export const SidebarContainer = styled(Container)`
  position: absolute;
  height: calc(100vh - 60px);
  width: 420px;
  border-right: 2px solid #eaecef;
  background: white;
  z-index: 10;
  border-radius: 0pt 30pt 30pt 0pt;

  @media (max-width: 768px) {
    min-width: 100vw;
    border-right: 0px;
    border-radius: 0;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: transparent;
  color: ${(props) => props.theme.primaryColor};
  font: inherit;
  text-indent: 100%;
  cursor: pointer;
  content: "X";

  &:hover {
    background: ${(props) => hexToRGB(props.theme.primaryColor, "0.1")};
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const DangerHeader = styled.div<{ level: string }>`
  margin-top: 20px;
  margin-right: 30px;
  background: ${(props) => AvaColors[props.level]};
  border-radius: 4px;
  padding: 2px;
  text-align: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

export const DangerH2 = styled.h2<{ level: number }>`
  font-weight: ${(props) =>
    props.level === 4 || props.level === 5 ? 600 : 500};
  margin: 0;
  color: ${(props) =>
    props.level === 4 || props.level === 5 ? "white" : "black"};
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
  color: ${(props) => (props.color ? props.theme.primaryColor : "#0e2127")};
  min-width: 48px;
  font-size: ${(props) => (props.size ? props.size : "48px")};
  margin-top: ${(props) => props.marginTop};
  background-color: transparent;
  background: transparent;
  justify-content: center;
`;

export const PDFButton = styled.i`
  background-color: ${(props) => hexToRGB(props.theme.accentColor, "0.8")};
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 4px;
  margin: 15px 0px 0px 0px;
  cursor: pointer;

  /* Darker background on mouse-over */
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

export const ScrollView = styled.div`
  display: flex;
  margin: 10px 0px;
  overflow-y: auto;
`;

export const ColorColumn = styled.div<{ dangerColor: string }>`
  min-width: 10px;
  background: ${(props) => props.dangerColor};
  border-radius: 2px;
  margin: 20px 10px 0px 0px;
  //box-shadow: rgba(17, 17, 26, 0.1) 1px 1px 0px;
`;

export const BoxCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const IconContainer = styled(Container)`
  flex: 1;
  margin-bottom: 12px;
`;

export const TendencyIconContainer = styled(HorizontalBar)`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: rgba(14, 33, 39, 0.05);
  border-radius: 4px;
`;

export const WrappedIconContainer = styled.div`
  margin: 30px 0px 0px 0px;
  display: flex;

  @media (max-width: 768px) {
    flex-wrap: none;
    flex-direction: horizontal;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const AvalancheImg = styled.img<{
  width: string;
  height: string;
  position?: string;
}>`
  position: ${(props) => props.position};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const AvalancheContainer = styled.div<{ size: string }>`
  position: relative;
  display: flex;
  min-width: ${(props) => props.size};
  margin-right: 20px;
`;

export const ElevationContainer = styled(Container)`
  justify-content: center;
  align-self: center;
  height: 90%;
  font-size: 12px;
  margin-left: 5px;
`;
