class AvalancheProblem {
  label;
  uri;

  constructor(label: string, uri: any) {
    this.label = label;
    this.uri = uri;
  }
}

export const AvalancheProblems: Record<string, any> = {
  new_snow: new AvalancheProblem(
    "New snow",
    require("../assets/avalanche-problems/new_snow.png")
  ),
  drifting_snow: new AvalancheProblem(
    "Wind-drifted snow",
    require("../assets/avalanche-problems/wind_drifted_snow.png")
  ),
  old_snow: new AvalancheProblem(
    "Persistent weak layers",
    require("../assets/avalanche-problems/persistent_weak_layers.png")
  ),
  wet_snow: new AvalancheProblem(
    "Wet snow",
    require("../assets/avalanche-problems/wet_snow.png")
  ),
  gliding_snow: new AvalancheProblem(
    "Gliding snow",
    require("../assets/avalanche-problems/gliding_snow.png")
  ),
  favourable_situation: new AvalancheProblem(
    "Favourable situation",
    require("../assets/avalanche-problems/favourable_situation.png")
  ),
};
