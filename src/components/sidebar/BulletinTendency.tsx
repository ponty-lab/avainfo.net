import { format } from "date-fns";
import React, { memo } from "react";
import { TRiskTrend } from "../../models";
import { Caption } from "../../styles/typography.styles";
import { Icon, IconButton } from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";
//import i18n from "i18n-js";

const RiskTrend: Record<string, string> = {
  decreasing: "45deg",
  steady: "0deg",
  increasing: "-45deg",
};

type Props = {
  validDate: Date;
  tendency: TRiskTrend;
  size?: number;
};

const BulletinTendency: React.FC<Props> = ({ tendency, validDate, size }) => {
  const _getDate = (date: Date) => {
    if (date) {
      return format(date, "EEEE, dd.MM.yy");
    }
    return null;
  };

  const trendDate = _getDate(validDate);
  const [trendData, setTrendData] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (tendency === "n/a") {
      setTrendData(false);
    }
  }, [tendency]);

  if (trendData) {
    return (
      <>
        {tendency != "n/a" ? (
          <div style={{ flex: 1 }}>
            <Icon rotate={RiskTrend[tendency]}>
              <i className="fa fa-arrow-right-long"></i>
            </Icon>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p
                style={{
                  display: "flex",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {toTitleCase(tendency)} danger on {trendDate}
              </p>
            </div>
          </div>
        ) : null}
      </>
    );
  }
  return null;
};

export default memo(BulletinTendency);
