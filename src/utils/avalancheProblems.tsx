type AvalancheProblemType = {
  label: string;
  uri: string;
};

type AvalancheProblemsType = Record<string, AvalancheProblemType>;

import {
  FavourableSituation,
  GlidingSnow,
  NewSnow,
  OldSnow,
  WetSnow,
  WindDrift,
} from "../assets/avalanche-problems";

class AvalancheProblem {
  label;
  uri;

  constructor(label: string, uri: string) {
    this.label = label;
    this.uri = uri;
  }
}

export const AvalancheProblems: AvalancheProblemsType = {
  new_snow: new AvalancheProblem("New snow", NewSnow),
  drifting_snow: new AvalancheProblem("Wind-drifted snow", WindDrift),
  old_snow: new AvalancheProblem("Persistent weak layers", OldSnow),
  wet_snow: new AvalancheProblem("Wet snow", WetSnow),
  gliding_snow: new AvalancheProblem("Gliding snow", GlidingSnow),
  favourable_situation: new AvalancheProblem(
    "Favourable situation",
    FavourableSituation
  ),
};
