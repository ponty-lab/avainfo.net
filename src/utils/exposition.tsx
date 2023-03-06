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

class ExpositionIcon {
  uri;
  constructor(uri: string) {
    this.uri = uri;
  }
}

export const Exposition = {
  N: new ExpositionIcon(expoN),
  NE: new ExpositionIcon(expoNE),
  E: new ExpositionIcon(expoE),
  SE: new ExpositionIcon(expoSE),
  S: new ExpositionIcon(expoS),
  SW: new ExpositionIcon(expoSW),
  W: new ExpositionIcon(expoW),
  NW: new ExpositionIcon(expoNW),
  BG: new ExpositionIcon(expoBG),
};
