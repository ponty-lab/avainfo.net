import { hexToRGB } from "../utils/hexToRGB";

const lightBlue = hexToRGB("#286882", "0.4");

const AvaColors: Record<string, string> = {
  "-1": lightBlue,
  "0": lightBlue,
  "1": "#ccff66",
  "2": "#ffff00",
  "3": "#ff9900",
  "4": "#ff0000",
  "5": "#600000",
};

export default AvaColors;
