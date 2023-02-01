export type TDualRiskLevel =
  | "0_0"
  | "0_1"
  | "0_2"
  | "0_3"
  | "0_4"
  | "0_5"
  | "1_0"
  | "1_1"
  | "1_2"
  | "1_3"
  | "1_4"
  | "1_5"
  | "2_0"
  | "2_1"
  | "2_2"
  | "2_3"
  | "2_4"
  | "2_5"
  | "3_0"
  | "3_1"
  | "3_2"
  | "3_3"
  | "3_4"
  | "3_5"
  | "4_0"
  | "4_1"
  | "4_2"
  | "4_3"
  | "4_4"
  | "4_5"
  | "5_0"
  | "5_1"
  | "5_2"
  | "5_3"
  | "5_4"
  | "5_5";

export const Aspects = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const AvProblemType = [
  "new_snow",
  "drifting_snow",
  "old_snow",
  "wet_snow",
  "gliding_snow",
  "favourable_situation",
] as const;

export type TRiskTrend = "decreasing" | "steady" | "increasing" | "n/a";
export type TAvProblemType = typeof AvProblemType[number];
export type TAspect = typeof Aspects[number];
export type TAvalancheSituations = {
  aspects: TAspect[];
  avalancheSituation: TAvProblemType;
  elevationLow?: string;
  elevationHigh?: string;
};
