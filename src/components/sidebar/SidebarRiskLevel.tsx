import React from "react";
import styled from "styled-components";
import { WarningLevels } from "./warning-levels.constants";
import { TDualRiskLevel } from "../../models";
import { HorizontalBar, IconContainer } from "../../styles/pages.style";

const SIZE = 60;

type Props = {
  dangerRatingInfo: any;
};

const RiskLevel: React.FC<Props> = ({ dangerRatingInfo }) => {
  if (dangerRatingInfo.length === 0) {
    return null;
  }

  return (
    <HorizontalBar style={{ marginTop: 10 }}>
      {dangerRatingInfo.map((info: any, index: number) => {
        return (
          <DangerIcon
            key={`danger_${index}`}
            risk={info.dualRisk}
            label={info.label}
            timePeriod={info.timePeriod}
          />
        );
      })}
    </HorizontalBar>
  );
};

type DangerIconProps = {
  risk: TDualRiskLevel;
  label?: string | undefined;
  timePeriod?: string | undefined;
};

const DangerIcon: React.FC<DangerIconProps> = ({ risk, label, timePeriod }) => {
  return (
    <IconContainer style={{ marginLeft: "15px" }}>
      <h4>{timePeriod}</h4>
      <HorizontalBar style={{ marginLeft: "15px" }}>
        <img
          src={WarningLevels[risk].uri}
          style={{ width: SIZE * 1.2, height: SIZE }}
          alt="DangerRating Icon"
        />
        {label ? (
          <ElevationContainer>
            <span>{label}</span>
          </ElevationContainer>
        ) : null}
      </HorizontalBar>
    </IconContainer>
  );
};

const ElevationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  height: 90%;
  font-size: 12px;
  margin-left: 5px;
`;

export default RiskLevel;
