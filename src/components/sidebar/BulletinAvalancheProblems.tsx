import React, { memo, useEffect, useState } from "react";
import { ExpositionIcon } from "../ExpositionIcon";
import { AvalancheProblems, WarningLevels } from "../../utils";
import { Label } from "../../styles/typography.style";
import {
  AvalancheContainer,
  AvalancheImg,
  Container,
  ElevationContainer,
  HorizontalBar,
} from "../../styles/sidebar.style";

const SIZE = 36;

type Props = {
  data: any;
};

const BulletinAvalancheProblems: React.FC<Props> = ({ data }) => {
  const imgSize = `${SIZE * 1.2}px`;

  const AvalancheSituationsLabel: Record<number, string> = {
    0: "AM",
    1: "PM",
  };
  const [avalancheSituations, setAvalancheSituations] = React.useState<any[]>(
    []
  );

  useEffect(() => {
    console.log("Avalanche Problems", data);
    if (data) {
      const avalancheProblems = Object.values(data)
        .filter((problem: any) => problem.type !== "no_distinct_pattern")
        .map((_problem: any) => {
          const problem: any = { ..._problem };
          problem.aspects = problem.aspects?.length
            ? problem.aspects.split(",")
            : undefined;
          problem.uri = AvalancheProblems[problem.type].uri;
          problem.labelType = AvalancheProblems[problem.type].label;
          problem.labelDay =
            problem.validTimePeriod === "earlier"
              ? `${AvalancheSituationsLabel[0]}: `
              : problem.validTimePeriod === "later"
              ? `${AvalancheSituationsLabel[1]}: `
              : null;
          return problem;
        });
      setAvalancheSituations(avalancheProblems);
      console.log(avalancheProblems);
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div style={{ marginBottom: 18 }}>
      <h3>Avalanche Problems</h3>
      <>
        {avalancheSituations.map((problem, index: number) => {
          return (
            <Container key={`problem_${index}`}>
              <Label style={{ marginTop: 10 }}>
                {problem.labelDay} {problem.labelType}
              </Label>
              <HorizontalBar
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                }}
              >
                <AvalancheContainer size={imgSize}>
                  <AvalancheImg
                    src={problem.uri}
                    width={imgSize}
                    height={imgSize}
                  />
                </AvalancheContainer>
                <ExpositionIcon aspects={problem.aspects} size={imgSize} />

                <ImageElevation elevation={problem.elevation} />
              </HorizontalBar>
            </Container>
          );
        })}
      </>
    </div>
  );
};

export default memo(BulletinAvalancheProblems);

type IEProps = {
  elevation: any;
};

type TBounds = "middle" | "above" | "below";

function ImageElevation({ elevation }: IEProps) {
  const [bounds, setBounds] = useState<string>("above");
  const elevationHigh = elevation?.lowerBound?.string;
  const elevationLow = elevation?.upperBound?.string;

  useEffect(() => {
    if (elevationHigh && elevationLow) {
      setBounds("middle");
    } else if (elevationHigh) {
      setBounds("above");
    } else if (elevationLow) {
      setBounds("below");
    }
  }, [elevationLow, elevationHigh]);

  if (!elevation) {
    return null;
  }

  const ElevationCaption = () => {
    return (
      <ElevationContainer>
        <span>{elevationLow ? `below ${elevationLow}` : ""}</span>
        <span>{elevationHigh ? `above ${elevationHigh}` : ""}</span>
      </ElevationContainer>
    );
  };

  return (
    <HorizontalBar>
      <AvalancheImg
        src={WarningLevels[bounds as TBounds].uri}
        width={`${SIZE * 1.4}px`}
        height={`${SIZE * 1.2}px`}
      />
      <ElevationCaption />
    </HorizontalBar>
  );
}
