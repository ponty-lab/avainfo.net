import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HorizontalBar } from "../../styles/pages.style";
import { WarningLevels } from "./warning-levels.constants";

const SIZE = 60;

type IconProps = {
  elevation: any;
  size?: number;
};

type TBounds = "middle" | "above" | "below";

export const ElevationIcon: React.FC<IconProps> = ({ elevation, size }) => {
  const [bounds, setBounds] = useState<string>("above");
  const elevationHigh = elevation?.lowerBound?.string;
  const elevationLow = elevation?.upperBound?.string;

  const imgSize = size || SIZE;

  useEffect(() => {
    if (elevationHigh && elevationLow) {
      setBounds("middle");
    } else if (elevationLow) {
      setBounds("below");
    } else if (elevationHigh) {
      setBounds("above");
    }
  }, [elevationLow, elevationHigh]);

  if (!elevation) {
    return null;
  }

  return (
    <HorizontalBar>
      <img
        src={WarningLevels[bounds as TBounds].uri}
        width={`${imgSize * 1.4}px`}
        height={`${imgSize * 1.2}px`}
      />
      <ElevationContainer>
        <span>{elevationLow ? `below ${elevationLow}` : ""}</span>
        <span>{elevationHigh ? `above ${elevationHigh}` : ""}</span>
      </ElevationContainer>
    </HorizontalBar>
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
