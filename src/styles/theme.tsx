import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    accentColor: string;
    background: string;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: "#286882",
  //primaryColor: "#AECBCC",
  //primaryColor: "#003942",
  //primaryColor: "#008289",
  //accentColor: "#d86623",
  accentColor: "#FFA52C",
  background: "#ffffff",
};
