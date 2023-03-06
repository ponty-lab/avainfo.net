// let obj = {
//   avalancheActivity_1_comment:
//     "The older wind slabs are lying on top of a weakly bonded old snowpack. They are to be evaluated with care and prudence in particular in very steep terrain. Avalanches can in some places be released by people. They can in some cases reach medium size.\nBackcountry touring and other off-piste activities call for careful route selection.",
//   avalancheActivity_1_highlights:
//     "Danger level 'moderate' (2=) in all aspects above 2400m. Other slopes about one danger level less.",
//   avalancheActivity_count: 1,
//   avalancheProblem_1_aspects: "",
//   avalancheProblem_1_elevation_lowerBound_string: "2400m",
//   avalancheProblem_1_type: "old_snow",
//   avalancheProblem_1_validTimePeriod: "allDay",
//   avalancheProblem_2_aspects: "",
//   avalancheProblem_2_elevation_lowerBound_string: "2400m",
//   avalancheProblem_2_type: "drifting_snow",
//   avalancheProblem_2_validTimePeriod: "allDay",
//   avalancheProblems_count: 2,
//   bulletinDate: "2023-02-10",
//   bulletinID: "CH-52624004",
//   bulletinURI:
//     "https://www.slf.ch/en/avalanche-bulletin-and-snow-situation.html#avalanchedanger",
//   dangerRating_1_elevation_lowerBound_numeric: 2400,
//   dangerRating_1_elevation_lowerBound_string: "2400m",
//   dangerRating_1_mainValue_numeric: 2,
//   dangerRating_1_mainValue_string: "moderate",
//   dangerRating_1_validTimePeriod: "allDay",
//   dangerRatings_count: 1,
//   highlights:
//     "In the northeast a considerable avalanche danger will prevail. Weakly bonded old snow requires caution.",
//   lang: "en",
//   maxDangerRating_allDay_numeric: 2,
//   maxDangerRating_allDay_string: "moderate",
//   maxDangerRating_earlier_numeric: 2,
//   maxDangerRating_earlier_string: "moderate",
//   maxDangerRating_later_numeric: 2,
//   maxDangerRating_later_string: "moderate",
//   pdfURI: "https://www.slf.ch/avalanche/bulletin/en/gk_c_en_complete.pdf",
//   publicationTime: "2023-02-09T16:00:00.000Z",
//   regionID: "CH-7211",
//   regionName: "Bergell",
//   source: "WSL Institute for Snow and Avalanche Research SLF",
//   tendencyComment:
//     "Following nights of clear skies it is expected to be predominantly sunny. Winds will be blowing mostly at light strength, at high altitudes intermittently at moderate strength, from northerly to easterly directions. Temperatures are rising a little bit each day. The zero-degree level on Sunday will lie at just below 3000 m.  <br/>  The danger of dry-snow avalanches is incrementally diminishing. On steep sunny slopes, isolated wet-snow slides and gliding avalanches are possible.",
//   validEndTime: "2023-02-10T16:00:00.000Z",
//   validStartTime: "2023-02-09T16:00:00.000Z",
//   weather_1_comment:
//     "On Wednesday night in the southern regions there was a small amount of fresh fallen snow registered down to low lying areas. In the remaining regions of Switzerland skies were clear. During the daytime hours on Thursday, skies were heavily overcast for the most part on the southern flank of the Alps, in the other regions of Switzerland skies were sunny.",
//   weather_1_highlight: "Observed weather review Thursday, 09.02.2023",
//   weather_1_snow: "-",
//   weather_1_temp:
//     "Winds were predominantly light, intermittently blowing at moderate strength at high altitudes, from easterly directions.",
//   weather_1_wind:
//     "At midday at 2000 m, between -6 °C in the northern regions and -12 °C in the southern regions.",
//   weather_2_comment:
//     "Following a night of clear skies it is expected to be sunny in the mountains.",
//   weather_2_highlight: "Weather forecast through Friday, 10.02.2023",
//   weather_2_snow: "-",
//   weather_2_temp: "Winds will be predominantly light from easterly directions.",
//   weather_2_wind: "At midday at 2000 m, approximately -2 °C.",
// };

import { AvalancheProblems } from "./avalancheProblems";

// Function to convert the flat tileset object to a nested object

type tBulletinMapbox = Record<string, string>;

export function bulletinFromMapbox(report: tBulletinMapbox) {
  const bulletin = processMapboxData(report);
  console.log("bulletin", bulletin);
  try {
    return {
      ...bulletin,
      avalancheProblem: processAvalancheProblems(bulletin.avalancheProblem),
    };
  } catch (err) {
    console.error("Error processing bulletin from Mapbox Vector Tileset", err);
    return null;
  }
}

export const processMapboxData = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {};

  for (const [keyString, value] of Object.entries(obj)) {
    const keys: string[] = keyString.split("_");

    let cur = newObj;

    // Create nested objects
    for (let i = 0; i < keys.length - 1; i++) {
      let key: any = keys[i];

      if (cur[key] === undefined) {
        cur[key] = {};
      }

      cur = cur[key];
    }
    const lastKey = keys[keys.length - 1];
    cur[lastKey] = value;
  }

  const keys = [
    "dangerRating",
    "weather",
    "avalancheProblem",
    "avalancheActivity",
  ];

  // If the second key is a number, convert the object to an array
  Object.keys(newObj).forEach((key) => {
    if (keys.includes(key)) {
      newObj[key] = Object.keys(newObj[key]).map(
        (intKey) => newObj[key][intKey]
      );
    }
  });

  //console.log(JSON.stringify(newObj, null, 2));
  return newObj;
};

function processAvalancheProblems(avalancheProblem: any[]) {
  if (avalancheProblem === undefined) return [];
  return avalancheProblem
    .filter((problem: any) => problem.type !== "no_distinct_pattern")
    .map((problem) => {
      const labels: string[] = ["AM", "PM"];
      if (problem instanceof Object) {
        return {
          ...problem,
          aspects: problem.aspects?.length
            ? problem.aspects.split(",")
            : undefined,
          uri: AvalancheProblems[problem.type].uri,
          labelType: AvalancheProblems[problem.type].label,
          labelDay:
            problem.validTimePeriod === "earlier"
              ? `${labels[0]}: `
              : problem.validTimePeriod === "later"
              ? `${[1]}: `
              : undefined,
        };
      } else return undefined;
    })
    .filter((value) => value !== undefined);
}

//processMapboxData(obj);
