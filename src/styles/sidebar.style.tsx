import styled from "styled-components";
import { hexToRGB } from "../utils/hexToRGB";
import { SubHeader } from "./typography.styles";
import AvaColors from "./colors.style";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalBar = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
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

export const View = styled(Container)<{ margin?: string; height?: string }>`
  height: ${(props) => props.height ?? "auto"};
  margin: ${(props) => props.margin ?? "25px"};
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
  rotate: string;
}

export const Icon = styled.i<styledIcon>`
  display: flex;
  rotate: ${(props) => props.rotate};
  color: black;
  font-size: 50px;
  background-color: transparent;
  justify-content: center;
`;

export const IconButton = styled.button`
  background-color: ${(props) => hexToRGB(props.theme.accentColor, "0.8")};
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;

  /* Darker background on mouse-over */
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

export const ScrollBar = styled.div`
  display: flex;
  //flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
`;

interface styledColor {
  dangerColor: string;
}

export const ColumnColor = styled.div<styledColor>`
  min-width: 15px;
  background: ${(props) => props.dangerColor};
  border-radius: 2px;
  margin-top: 20px;
  //margin-bottom: 10px;
  margin-right: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 1px 1px 0px;
`;

export const BoxCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
