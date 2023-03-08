import {
  expoBG,
  expoN,
  expoNE,
  expoE,
  expoSE,
  expoS,
  expoSW,
  expoW,
  expoNW,
} from "../assets/expositions";

type ExpositionType = Record<string, { uri: string }>;

export const Exposition: ExpositionType = {
  N: { uri: expoN },
  NE: { uri: expoNE },
  E: { uri: expoE },
  SE: { uri: expoSE },
  S: { uri: expoS },
  SW: { uri: expoSW },
  W: { uri: expoW },
  NW: { uri: expoNW },
  BG: { uri: expoBG },
};
