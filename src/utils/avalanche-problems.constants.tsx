import {
  FavourableSituation,
  GlidingSnow,
  NewSnow,
  OldSnow,
  WetSnow,
  WindDrift,
} from "../assets/avalanche-problems";

type AvalancheProblemType = {
  label: string;
  uri: string;
};

type AvalancheProblemsType = Record<string, AvalancheProblemType>;

export const AvalancheProblems: AvalancheProblemsType = {
  new_snow: { label: "New snow", uri: NewSnow },
  drifting_snow: { label: "Wind-drifted snow", uri: WindDrift },
  old_snow: { label: "Persistent weak layers", uri: OldSnow },
  wet_snow: { label: "Wet snow", uri: WetSnow },
  gliding_snow: { label: "Gliding snow", uri: GlidingSnow },
  favourable_situation: {
    label: "Favourable situation",
    uri: FavourableSituation,
  },
};
