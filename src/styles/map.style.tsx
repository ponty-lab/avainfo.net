import styled from "styled-components";
import { HorizontalBar } from "./pages.style";
import AvaColors from "./colors.style";
import { hexToRGB } from "../utils";

// Map styles

export const MapContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 60px);
`;

// CSS for the map's date
export const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1;
  width: 215px;
  height: 32px;
  border-radius: 50px;
  background: ${(props) => props.theme.colors.primary};
`;

export const DateTime = styled.div`
  display: flex;
  justify-content: center;
  padding: 3px 18px;
  padding-top: 3px !important;
  padding-bottom: 3px !important;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: white;
`;

// CSS for the toggle button
export const ToggleContainer = styled.label`
  max-width: 100%;

  > input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
`;

export const Toggle = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  color: #757d82;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 18px;
  border-radius: 15px;
  /* fully round by default */
  background-color: transparent;
  transition: color 0.125s, background-color 0.125s;
  padding-top: 3px !important;
  padding-bottom: 3px !important;

  input:checked + &--active-white {
    color: ${(props) => props.theme.colors.background};
  }

  input:checked + & {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }
`;

export const ToggleGroup = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  display: inline-flex;
  text-align: center;
  border-radius: 18px;
  margin-right: 30px !important;
  margin-top: 12px !important;
  border-style: solid;
  border-width: 1px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
`;

// css for the danger scale
export const ColorBox = styled.div<{ level: string }>`
  background: ${(props) => hexToRGB(AvaColors[props.level], "0.8")};
  flex: 1;
  min-height: 20px;
  min-width: 50px;
  text-align: center;
  padding: 2px 6px;
  font-size: large;
  margin-top: 10px;
`;

export const DangerScaleBar = styled(HorizontalBar)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1 !important;
`;
