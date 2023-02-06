import React, { memo, useEffect, useState } from "react";
import { ExpositionIcon } from "../ExpositionIcon";
import { AvalancheProblems, WarningLevels } from "../../utils";
import { TAvalancheSituations } from "../../models";
import { Caption, SubHeader } from "../../styles/typography.styles";

const SIZE = 45;

type Props = {
  properties: any;
  validTimePeriod: string;
};

const BulletinAvalancheProblems: React.FC<Props> = ({
  properties,
  validTimePeriod,
}) => {
  const AvalancheSituationsLabel: Record<number, string> = {
    0: "AM",
    1: "PM",
  };
  const [avalancheSituations, setAvalancheSituations] = React.useState<any[]>(
    []
  );

  useEffect(() => {
    const avalancheProblems = [];
    const match = new RegExp("avalancheProblem_");
    const keys = Object.keys(properties).filter(
      (key) => match.test(key) == true
    );

    for (let i = 1; i <= properties.avalancheProblems_count; i++) {
      const match = new RegExp(`avalancheProblem_${i}`);

      const problem = keys
        .filter((key) => match.test(key))
        .reduce((obj, key) => {
          let val;
          if (new RegExp("type").test(key)) {
            val = { type: properties[key] };
          } else if (
            new RegExp("aspects").test(key) &&
            properties[key].length
          ) {
            val = { aspects: properties[key].split(",") };
          } else if (new RegExp("validTimePeriod").test(key)) {
            val = { validTimePeriod: properties[key] };
          } else if (new RegExp("terrainFeature").test(key)) {
            val = { terrainFeature: properties[key] };
          } else if (new RegExp("elevation_lowerBound_string").test(key)) {
            val = { elevationHigh: properties[key] };
          } else if (new RegExp("elevation_upperBound_string").test(key)) {
            val = { elevationLow: properties[key] };
          }
          return { ...obj, ...val };
        }, {});

      avalancheProblems.push(problem);
    }
    setAvalancheSituations(avalancheProblems);
    //console.log(avalancheProblems);
  }, [properties]);

  return (
    <div>
      {avalancheSituations.length ? (
        <div>
          <SubHeader style={styles.title}>Avalanche Problems</SubHeader>
          <div>
            {avalancheSituations.map((problem, index: number) => {
              const uri =
                problem.type !== "no_distinct_pattern"
                  ? AvalancheProblems[problem.type].uri
                  : null;

              const labelType =
                problem.type !== "no_distinct_pattern"
                  ? AvalancheProblems[problem.type].label
                  : null;
              const labelDay =
                problem.validTimePeriod === "earlier"
                  ? `${AvalancheSituationsLabel[0]}: `
                  : problem.validTimePeriod === "later"
                  ? `${AvalancheSituationsLabel[1]}: `
                  : null;

              return (
                <div key={`problem_${index}`} style={{ marginTop: 10 }}>
                  {problem.type === "no_distinct_pattern" ? (
                    <p>No distinct avalanche pattern</p>
                  ) : (
                    <div
                      key={`problem_${index}`}
                      style={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {labelType ? (
                        <Caption
                          validDate={false}
                          style={{
                            display: "flex",
                            color: "gray",
                            //fontSize: 12,
                            marginBottom: 10,
                            marginTop: 20,
                          }}
                        >
                          {labelDay}
                          {labelType}
                        </Caption>
                      ) : null}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 5,
                          marginLeft: 10,
                        }}
                      >
                        {uri ? (
                          <img
                            src={uri}
                            style={{
                              display: "flex",
                              width: SIZE * 1.2,
                              height: SIZE * 1.2,
                              marginRight: 20,
                              alignSelf: "center",
                            }}
                          />
                        ) : null}
                        <ExpositionIcon
                          aspects={problem.aspects}
                          size={SIZE * 1.2}
                        />

                        <ImageElevation
                          elevationHigh={problem.elevationHigh}
                          elevationLow={problem.elevationLow}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(BulletinAvalancheProblems);

type IEProps = {
  elevationHigh?: string;
  elevationLow?: string;
};

type TBounds = "middle" | "above" | "below";

function ImageElevation({ elevationHigh, elevationLow }: IEProps) {
  const [bounds, setBounds] = useState<string>("above");

  useEffect(() => {
    if (elevationHigh && elevationLow) {
      setBounds("middle");
    } else if (elevationHigh) {
      setBounds("above");
    } else if (elevationLow) {
      setBounds("below");
    }
  }, [elevationLow, elevationHigh]);

  if (!elevationHigh && !elevationLow) {
    return null;
  }

  const ElevationCaption = () => {
    if (elevationHigh && elevationLow) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
            height: "90%",
            fontSize: 12,
            color: "black",
            //marginBottom: 20,
            marginLeft: 5,
            //marginTop: 20
          }}
        >
          <span>below {elevationLow}</span>
          <span>above {elevationHigh}</span>
        </div>
      );
    } else if (elevationHigh) {
      return (
        <Caption
          validDate={false}
          style={{
            alignSelf: "center",
            //fontSize: 12,
            color: "black",
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          {elevationHigh}
        </Caption>
      );
    } else {
      return (
        <Caption
          validDate={false}
          style={{
            alignSelf: "center",
            fontSize: 12,
            color: "black",
            marginBottom: 10,
            marginLeft: 5,
          }}
        >
          {elevationLow}
        </Caption>
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img
        src={WarningLevels[bounds as TBounds].uri}
        style={{
          width: SIZE * 1.3,
          height: SIZE,
          //marginLeft: 20,
          alignSelf: "center",
        }}
      />
      <ElevationCaption />
    </div>
  );
}

const styles = {
  title: {
    marginTop: 20,
  },
  imageRow: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    height: "90%",
    fontSize: 12,
    color: "black",
    //marginBottom: 20,
    marginLeft: 5,
    //marginTop: 20,
  },
};
