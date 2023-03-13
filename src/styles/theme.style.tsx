import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      accent2?: string;
      background: string;
      text: string;
    };
    dangerColors: {};
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    //AvaInfo theme colors
    primary: "#286882",
    accent: "#F18D39",
    accent2: "#FFD3B5",
    background: "#ffffff",
    text: "#0e2127",
  },
  dangerColors: {
    "n/a": "#42799a",
    "-1": "#42799a",
    0: "#42799a",
    1: "#ccff66",
    2: "#ffff00",
    3: "#ff9900",
    4: "#ff0000",
    5: "#600000",
  },
};
