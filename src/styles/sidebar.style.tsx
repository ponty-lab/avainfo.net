import styled from "styled-components";
import { hexToRGB } from "../utils/hexToRGB";

export const SidebarContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0px;
  height: calc(100vh - 60px);
  max-width: 35vw;
  border-right: 2px solid #eaecef;
  background-color: white;
  z-index: 10;
  border-radius: 0pt 30pt 30pt 0pt;

  @media (max-width: 900px) {
    min-width: 100vw;
  }
`;

interface styledPageProps {
  margin?: string;
}

export const Page = styled.div<styledPageProps>`
  margin: ${(props) => props.margin ?? "20px"};
  //margin-left: 50px;
  //margin-right: 20px;

  @media (max-width: 900px) {
    margin-left: 30px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonClose = styled.button`
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: transparent;
  color: #286882f2;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(29, 161, 142, 0.1);
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

export const Divider = styled.div`
  height: 1px;
  margin-top: 15px;
  background: lightgray;
`;

export const Title = styled.h1`
  font-size: calc(22px + (32 - 22) * ((100vw - 300px) / (1600 - 300)));
  color: ${(props) => props.theme.primaryColor};
`;

export const SubHeader = styled.h2`
  font-size: calc(16px + (24 - 16) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 600;
  line-height: 1.6em;
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
  margin-top: 10px;
  margin-bottom: 10px;
  height: 800px;
  overflow-y: scroll;
`;

export const HorizontalBar = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

interface styledColor {
  dangerColor: string;
}

export const ColumnColor = styled.div<styledColor>`
  width: 15px;
  background: ${(props) => props.dangerColor};
  border-radius: 2px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const BoxCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
