import React, { memo, useEffect, useState } from "react";
import ExpositionIcon from "./ExpositionIcon";
import { WarningLevels } from "../../utils";
import {
  AvalancheBar,
  AvalancheContainer,
  AvalancheImg,
  AvalancheImgContainer,
  AvalancheLabel,
  Container,
  ElevationContainer,
  HorizontalBar,
} from "../../styles/sidebar.style";
import { TAvalancheProblem } from "../../models";

const SIZE = 36;

type Props = {
  problems: TAvalancheProblem[];
};

const BulletinAvalancheProblems: React.FC<Props> = ({ problems }) => {
  const imgSize = `${SIZE * 1.2}px`;

  if (!problems.length) {
    return null;
  }

  return (
    <AvalancheContainer>
      <h2>Avalanche Problems</h2>
      <>
        {problems.map((problem, index: number) => {
          return (
            <Container key={`problem_${index}`}>
              <AvalancheLabel>
                {problem.labelDay} {problem.labelType}
              </AvalancheLabel>
              <AvalancheBar>
                <AvalancheImgContainer size={imgSize}>
                  <AvalancheImg
                    src={problem.uri}
                    width={imgSize}
                    height={imgSize}
                  />
                </AvalancheImgContainer>
                <ExpositionIcon aspects={problem.aspects} size={imgSize} />
                <ImageElevation elevation={problem.elevation} />
              </AvalancheBar>
            </Container>
          );
        })}
      </>
    </AvalancheContainer>
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
    } else if (elevationLow) {
      setBounds("below");
    }
  }, [elevationLow, elevationHigh]);

  if (!elevation) {
    return null;
  }

  return (
    <HorizontalBar>
      <AvalancheImg
        src={WarningLevels[bounds as TBounds].uri}
        width={`${SIZE * 1.4}px`}
        height={`${SIZE * 1.2}px`}
      />
      <ElevationContainer>
        <span>{elevationLow ? `below ${elevationLow}` : ""}</span>
        <span>{elevationHigh ? `above ${elevationHigh}` : ""}</span>
      </ElevationContainer>
    </HorizontalBar>
  );
}
