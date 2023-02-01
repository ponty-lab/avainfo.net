class ExpositionIcon {
  uri;
  constructor(uri: any) {
    this.uri = uri;
  }
}

export const Exposition = {
  N: new ExpositionIcon(require("../assets/expositions/exposition_n.png")),
  NE: new ExpositionIcon(require("../assets/expositions/exposition_ne.png")),
  E: new ExpositionIcon(require("../assets/expositions/exposition_e.png")),
  SE: new ExpositionIcon(require("../assets/expositions/exposition_se.png")),
  S: new ExpositionIcon(require("../assets/expositions/exposition_s.png")),
  SW: new ExpositionIcon(require("../assets/expositions/exposition_sw.png")),
  W: new ExpositionIcon(require("../assets/expositions/exposition_w.png")),
  NW: new ExpositionIcon(require("../assets/expositions/exposition_nw.png")),
  BG: new ExpositionIcon(require("../assets/expositions/exposition_bg.png")),
};
