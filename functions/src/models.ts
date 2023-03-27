// eslint-disable-next-line import/no-unresolved
import { Timestamp } from "firebase-admin/firestore";

export const Aspects = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;
const ProblemType = [
  "new_snow",
  "wind_slab",
  "persistent_weak_layers",
  "wet_snow",
  "gliding_snow",
  "cornices",
  "no_distinct_avalanche_problem",
  "favourable_situation",
] as const;

export type TAspects = (typeof Aspects)[number];
export type TAvalancheSize = -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type TDangerRatingValue =
  | "no_rating"
  | "no_snow'"
  | "low"
  | "moderate"
  | "considerable"
  | "high"
  | "very_high";
type TFrequency = "few" | "some" | "many";
type TProblemType = (typeof ProblemType)[number];
type TSnowpackStability = "very_poor" | "poor" | "fair" | "good";
type TTendencyType = "decreasing" | "steady" | "increasing";
export type TValidTimePeriod = "allDay" | "earlier" | "later";

export interface IBulletin {
  bulletinID: string[];
  bulletinDate: string;
  lang: string;
  regionID: string;
  regionName: string;
  publicationTime: Timestamp;
  validTime: IValidTime;
  source: string;
  maxDangerRatings: {
    earlier: IDangerRatingValue | null;
    later: IDangerRatingValue | null;
    allDay: IDangerRatingValue | null;
  };
  dangerRatings?: IDangerRating[] | undefined;
  avalancheProblems?: IAvalancheProblem[];
  highlights?: string;
  weather?: IWeather[];
  avalancheActivity?: IText[];
  snowpackStructure?: IText;
  travelAdvisory?: IText;
  tendency?: ITendency;
  metaData?: IMetaData;
  pdfURI?: string;
  bulletinURI?: string;
  provider: string;
}

export interface IAvalancheProblem {
  type: TProblemType;
  aspects?: TAspects[];
  elevation: IElevation;
  validTimePeriod?: TValidTimePeriod;
  terrainFeature?: string;
  avalancheSize?: TAvalancheSize;
  snowpackStability?: TSnowpackStability;
  frequency?: TFrequency;
}

export interface IDangerRating {
  mainValue: IDangerRatingValue;
  aspects?: TAspects[];
  elevation?: IElevation | null;
  validTimePeriod?: TValidTimePeriod;
}

export interface IDangerRatingValue {
  numeric: TAvalancheSize;
  string: TDangerRatingValue;
}

export interface IElevation {
  lowerBound?: IElevationValue;
  upperBound?: IElevationValue;
}

export interface IElevationValue {
  numeric: number;
  string: string;
}

export interface IExtFile {
  fileType: string;
  description: string;
  uri: string;
}

export interface IMetaData {
  extFile: IExtFile[];
}

export interface ISource {
  name: string;
  website: string;
}

export interface ITendency {
  type?: TTendencyType;
  highlight?: string;
  comment?: string;
  validTime?: IValidTime;
}

export interface IText {
  highlight?: string;
  comment?: string;
}

export interface IValidTime {
  startTime: Timestamp;
  endTime: Timestamp;
}

export interface IWeather {
  highlight?: string;
  comment?: string;
  snow?: string;
  temp?: string;
  wind?: string;
}
