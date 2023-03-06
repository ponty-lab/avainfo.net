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
const ProblemType = [
  "new_snow",
  "drifting_snow",
  "old_snow",
  "wet_snow",
  "gliding_snow",
  "favourable_situation",
] as const;

type TFrequency = "few" | "some" | "many";
export type TRiskTrend = "decreasing" | "steady" | "increasing" | "n/a";
export type TValidTimePeriod = "allDay" | "earlier" | "later";
export type TAvalancheSize = -1 | 0 | 1 | 2 | 3 | 4 | 5;
type TSnowpackStability = "very_poor" | "poor" | "fair" | "good";
export type TProblemType = typeof ProblemType[number];
export type TAspect = typeof Aspects[number];
export type TAvalancheSituations = {
  aspects: TAspect[];
  avalancheSituation: TProblemType;
  elevationLow?: string;
  elevationHigh?: string;
};
export type TTimePeriod = "AM" | "PM";

// types for the Mapbox Vector Tile

export type TStability = {
  comment: string;
  highlight: string;
};

export type TWeather = TStability & {
  snow: string;
  wind: string;
  temp: string;
};

export type TAvalancheProblem = {
  type: TProblemType;
  aspects?: TAspect[];
  elevation: IElevation;
  validTimePeriod?: TValidTimePeriod;
  terrainFeature?: string;
  avalancheSize?: TAvalancheSize;
  snowpackStability?: TSnowpackStability;
  frequency?: TFrequency;
  uri: string;
  labelType: string;
  labelDay: string;
};

export type IElevation = {
  lowerBound?: IElevationValue;
  upperBound?: IElevationValue;
};

export type IElevationValue = {
  numeric: number;
  string: string;
};

export type IValidTime = {
  startTime: Date;
  endTime: Date;
};
