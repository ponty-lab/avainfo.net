import { AvalancheProblems } from "../../components/sidebar/avalanche-problems.constants";

// Function to convert the flat tileset object to a nested object

type tBulletinMapbox = Record<string, string>;

export function processMapboxData(report: tBulletinMapbox) {
  const bulletin = bulletinFromMapboxTileset(report);
  try {
    return {
      ...bulletin,
      avalancheProblem: processAvalancheProblems(bulletin.avalancheProblem),
      dangerRatingImageInfo: processDangerRatings(bulletin.dangerRating),
    };
  } catch (err) {
    console.error("Error processing bulletin from Mapbox Vector Tileset", err);
    return null;
  }
}

export const bulletinFromMapboxTileset = (obj: Record<string, any>) => {
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
              ? `${labels[1]}: `
              : undefined,
        };
      } else return undefined;
    })
    .filter((value) => value !== undefined);
}

function processDangerRatings(dangerRatings: any[]) {
  const labels: Record<string, string> = {
    earlier: "AM",
    later: "PM",
    allDay: "All Day",
  };

  let dangerRatingImgInfo: Record<string, any>[] = [];

  const timePeriods = getValidTimePeriods(dangerRatings);

  timePeriods.forEach((timePeriod: string) => {
    const level = getRiskByElevation(dangerRatings, timePeriod);
    /*
    If dangerRatingBelow and dangerRatingAbove are different, then
    we can use the elevation as the label to annotate the risk image.
    */
    const label =
      level.dangerRatingBelow !== level.dangerRatingAbove
        ? level.elev
        : undefined;

    const info = {
      timePeriod: labels[timePeriod],
      dualRisk: `${level.dangerRatingBelow ?? 0}_${level.dangerRatingAbove}`,
      label,
    };
    dangerRatingImgInfo.push(info);
  });

  return dangerRatingImgInfo;
}

// Returns a list of danger ratings for a given elevation

function getRiskByElevation(
  dangerRatings: Record<string, any>[],
  validTimePeriod: string
) {
  return dangerRatings
    .filter((dangerRating) => dangerRating.validTimePeriod === validTimePeriod)
    .reduce((obj, dangerRating) => {
      let val;
      if (dangerRating.elevation?.upperBound) {
        val = {
          dangerRatingBelow: dangerRating.mainValue.numeric,
          elev: dangerRating.elevation.upperBound.string,
        };
      } else if (dangerRating.elevation?.lowerBound) {
        val = {
          dangerRatingAbove: dangerRating.mainValue.numeric,
          elev: dangerRating.elevation.lowerBound.string,
        };
      } else {
        /*
        If there is no elevation, dangerRating is the same
        for the entire elevation range
        */
        val = {
          dangerRatingAbove: dangerRating.mainValue.numeric,
          dangerRatingBelow: dangerRating.mainValue.numeric,
        };
      }
      return { ...obj, ...val };
    }, {});
}

// Returns a list of validTimePeriods either ['allDay'] or ['earlier', 'later']

function getValidTimePeriods(dangerRatings: Record<string, any>[]): string[] {
  const validTimePeriod = new Set<string>();
  dangerRatings.forEach((dangerRating) =>
    validTimePeriod.add(dangerRating.validTimePeriod)
  );
  return Array.from(validTimePeriod);
}

//processMapboxData(obj);
