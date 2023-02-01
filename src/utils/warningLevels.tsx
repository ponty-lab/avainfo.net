//import React from "react";
//import i18n from "i18n-js";
//import { ImageSourcePropType } from "react-native";

//type ImageSourcePropType = React.ComponentProps<typeof Image>["source"];

class WarningLevel {
  uri;

  constructor(uri: any) {
    this.uri = uri;
  }
}

export const WarningLevels = {
  "0_0": new WarningLevel(require("../assets/warning-levels/levels_0_0.png")),
  "0_1": new WarningLevel(require("../assets/warning-levels/levels_0_1.png")),
  "0_2": new WarningLevel(require("../assets/warning-levels/levels_0_2.png")),
  "0_3": new WarningLevel(require("../assets/warning-levels/levels_0_3.png")),
  "0_4": new WarningLevel(require("../assets/warning-levels/levels_0_4.png")),
  "0_5": new WarningLevel(require("../assets/warning-levels/levels_0_5.png")),
  "1_0": new WarningLevel(require("../assets/warning-levels/levels_1_0.png")),
  "1_1": new WarningLevel(require("../assets/warning-levels/levels_1_1.png")),
  "1_2": new WarningLevel(require("../assets/warning-levels/levels_1_2.png")),
  "1_3": new WarningLevel(require("../assets/warning-levels/levels_1_3.png")),
  "1_4": new WarningLevel(require("../assets/warning-levels/levels_1_4.png")),
  "1_5": new WarningLevel(require("../assets/warning-levels/levels_1_5.png")),
  "2_0": new WarningLevel(require("../assets/warning-levels/levels_2_0.png")),
  "2_1": new WarningLevel(require("../assets/warning-levels/levels_2_1.png")),
  "2_2": new WarningLevel(require("../assets/warning-levels/levels_2_2.png")),
  "2_3": new WarningLevel(require("../assets/warning-levels/levels_2_3.png")),
  "2_4": new WarningLevel(require("../assets/warning-levels/levels_2_4.png")),
  "2_5": new WarningLevel(require("../assets/warning-levels/levels_2_5.png")),
  "3_0": new WarningLevel(require("../assets/warning-levels/levels_3_0.png")),
  "3_1": new WarningLevel(require("../assets/warning-levels/levels_3_1.png")),
  "3_2": new WarningLevel(require("../assets/warning-levels/levels_3_2.png")),
  "3_3": new WarningLevel(require("../assets/warning-levels/levels_3_3.png")),
  "3_4": new WarningLevel(require("../assets/warning-levels/levels_3_4.png")),
  "3_5": new WarningLevel(require("../assets/warning-levels/levels_3_5.png")),
  "4_0": new WarningLevel(require("../assets/warning-levels/levels_4_0.png")),
  "4_1": new WarningLevel(require("../assets/warning-levels/levels_4_1.png")),
  "4_2": new WarningLevel(require("../assets/warning-levels/levels_4_2.png")),
  "4_3": new WarningLevel(require("../assets/warning-levels/levels_4_3.png")),
  "4_4": new WarningLevel(require("../assets/warning-levels/levels_4_4.png")),
  "4_5": new WarningLevel(require("../assets/warning-levels/levels_4_5.png")),
  "5_0": new WarningLevel(require("../assets/warning-levels/levels_5_0.png")),
  "5_1": new WarningLevel(require("../assets/warning-levels/levels_5_1.png")),
  "5_2": new WarningLevel(require("../assets/warning-levels/levels_5_2.png")),
  "5_3": new WarningLevel(require("../assets/warning-levels/levels_5_3.png")),
  "5_4": new WarningLevel(require("../assets/warning-levels/levels_5_4.png")),
  "5_5": new WarningLevel(require("../assets/warning-levels/levels_5_5.png")),
  above: new WarningLevel(require("../assets/warning-levels/levels_above.png")),
  below: new WarningLevel(require("../assets/warning-levels/levels_below.png")),
  middle: new WarningLevel(
    require("../assets/warning-levels/levels_middle.png")
  ),
};
