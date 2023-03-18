import React, { memo } from "react";
import styled from "styled-components";
import ExpositionIcon from "./ExpositionIcon";
import { ElevationIcon } from "./ElevationIcon";
import { Container, ImgContainer } from "../../styles/pages.style";
import { Label, StyledH2 } from "../../styles/typography.style";
import { TAvalancheProblem } from "../../models";

const SIZE = 36;

type Props = {
  problems: TAvalancheProblem[];
};

const AvalancheProblems: React.FC<Props> = ({ problems }) => {
  const imgSize = `${SIZE * 1.2}px`;

  if (problems.length === 0) {
    return null;
  }

  return (
    <AvalancheContainer>
      <StyledH2 style={{ marginBottom: 0 }}>Avalanche Problems</StyledH2>
      <>
        {problems.map((problem, index: number) => {
          return (
            <Container style={{ marginLeft: 10 }} key={`problem_${index}`}>
              <AvalancheLabel>
                {problem.labelDay} {problem.labelType}
              </AvalancheLabel>
              <AvalancheBar>
                <ImgContainer size={imgSize}>
                  <img
                    src={problem.uri}
                    width={imgSize}
                    height={imgSize}
                    alt="AvalancheProblem Icon"
                  />
                </ImgContainer>
                <ExpositionIcon aspects={problem.aspects} size={imgSize} />
                <ElevationIcon elevation={problem.elevation} size={SIZE} />
              </AvalancheBar>
            </Container>
          );
        })}
      </>
    </AvalancheContainer>
  );
};

const AvalancheContainer = styled.div`
  margin-bottom: 18px;
`;

const AvalancheLabel = styled(Label)`
  margin: 20px 0px 10px;
`;

const AvalancheBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
`;

export default memo(AvalancheProblems);
