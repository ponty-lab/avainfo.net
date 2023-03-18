import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      background: string;
      text: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#286882",
    accent: "#F18D39",
    background: "#ffffff",
    text: "#0e2127",
  },
};
