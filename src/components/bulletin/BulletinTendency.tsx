import React, { memo } from "react";
import { TRiskTrend } from "../../models";
import { Caption } from "../../styles/typography.style";
import {
  Icon,
  IconContainer,
  TendencyIconContainer,
} from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { formatDate } from "../../utils/formatDate";
//import i18n from "i18n-js";

const RiskTrend: Record<string, string> = {
  decreasing: "45deg",
  steady: "0deg",
  increasing: "-45deg",
};

type Props = {
  validDate: string | undefined;
  tendency: TRiskTrend | undefined;
};

const BulletinTendency: React.FC<Props> = ({ tendency, validDate }) => {
  const trendDate = formatDate(validDate, "day");
  const [trendData, setTrendData] = React.useState<string | undefined>(
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
    <IconContainer>
      <h3> TENDENCY: {trendDate}</h3>
      <TendencyIconContainer>
        <Icon
          rotate={RiskTrend[trendData]}
          className="fa fa-arrow-right-long"
          size="36px"
          style={{ flex: 0.3 }}
        />
        <Caption style={{ flex: 0.7 }}>
          {toTitleCase(trendData)} avalanche danger
        </Caption>
      </TendencyIconContainer>
    </IconContainer>
  );
};

export default memo(BulletinTendency);
