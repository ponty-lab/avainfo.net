import React, { memo } from "react";
import styled from "styled-components";
import ExpositionIcon from "./ExpositionIcon";
import { ElevationIcon } from "./ElevationIcon";
import { Container, ImgContainer } from "../../styles/pages.style";
import { Label } from "../../styles/typography.style";
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
      <h2>Avalanche Problems</h2>
      <>
        {problems.map((problem, index: number) => {
          return (
            <Container key={`problem_${index}`}>
              <AvalancheLabel>
                {problem.labelDay} {problem.labelType}
              </AvalancheLabel>
              <AvalancheBar>
                <ImgContainer size={imgSize}>
                  <img src={problem.uri} width={imgSize} height={imgSize} />
                </ImgContainer>
                <ExpositionIcon aspects={problem.aspects} size={imgSize} />
                <ElevationIcon elevation={problem.elevation} />
              </AvalancheBar>
            </Container>
          );
        })}
      </>
    </AvalancheContainer>
  );
};

const AvalancheContainer = styled.div`
  margin-bottom: 18;
`;

const AvalancheLabel = styled(Label)`
  margin-top: 10;
`;

const AvalancheBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10;
  margin-left: 15;
`;

export default memo(AvalancheProblems);
