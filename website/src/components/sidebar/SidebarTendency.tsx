import React, { memo } from "react";
import styled from "styled-components";
import { TRiskTrend } from "../../models";
import { Caption, StyledH3 } from "../../styles/typography.style";
import { IconContainer } from "../../styles/pages.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { formatDate } from "../../utils/formatDate";
import {
  WiDirectionDownRight,
  WiDirectionRight,
  WiDirectionUpRight,
} from "react-icons/wi";

const TrendIcon = ({ trend }: { trend: TRiskTrend }) => {
  const size = 56;
  const flex = 0.25;

  if (trend === "decreasing") {
    return <WiDirectionDownRight size={size} style={{ flex }} />;
  } else if (trend === "steady") {
    return <WiDirectionRight size={size} style={{ flex }} />;
  } else if (trend === "increasing") {
    return <WiDirectionUpRight size={size} style={{ flex }} />;
  } else {
    return null;
  }
};

type Props = {
  validDate: string | undefined;
  tendency: TRiskTrend | undefined;
};

const Tendency: React.FC<Props> = ({ tendency, validDate }) => {
  const trendDate = formatDate(validDate, "day");
  const [trendData, setTrendData] = React.useState<TRiskTrend | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (tendency !== "n/a") {
      setTrendData(tendency);
    }
  }, [tendency]);

  if (!trendData || !tendency) {
    return null;
  }

  return (
    <IconContainer style={{ marginTop: 15 }}>
      <StyledH3> TENDENCY: {trendDate}</StyledH3>
      <TendencyIconContainer>
        <TrendIcon trend={trendData} />
        <Caption style={{ flex: 0.85 }}>
          {toTitleCase(trendData)} avalanche danger
        </Caption>
      </TendencyIconContainer>
    </IconContainer>
  );
};

const TendencyIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background: rgba(14, 33, 39, 0.05);
  border-radius: 4px;
`;

export default memo(Tendency);
