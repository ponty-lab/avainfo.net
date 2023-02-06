import React, { memo, useEffect } from "react";
import { WarningLevels } from "../../utils";
import { TDualRiskLevel } from "../../models";
import { Caption } from "../../styles/typography.styles";
import { BoxCenter, HorizontalBar } from "../../styles/sidebar.style";

type Props = {
  properties: any;
  validTimePeriod: string;
  dangerLevel: string;
};

const BulletinRiskLevel: React.FC<Props> = ({
  properties,
  validTimePeriod,
  dangerLevel,
}) => {
  const SIZE = 80;

  const [label, setLabel] = React.useState<string | null>(null);
  const [riskLevel, setRiskLevel] = React.useState<TDualRiskLevel>(
    `${dangerLevel}_${dangerLevel}` as TDualRiskLevel
  );

  useEffect(() => {
    const dangerRatings: Record<string, string>[] = [];
    // Filters dangerRating keys
    const match = new RegExp("dangerRating_");
    const keys = Object.keys(properties).filter(
      (key) => match.test(key) == true
    );

    for (let i = 1; i <= properties.dangerRatings_count; i++) {
      const match = new RegExp(`dangerRating_${i}`);
      const rating = keys
        .filter((key) => match.test(key))
        .reduce((obj, key) => {
          let val;
          if (new RegExp("mainValue_numeric").test(key)) {
            val = { mainValue: properties[key] };
          } else if (new RegExp("validTimePeriod").test(key)) {
            val = { validTimePeriod: properties[key] };
          } else if (new RegExp("elevation_lowerBound_string").test(key)) {
            val = { lowerElev: properties[key] };
          } else if (new RegExp("elevation_upperBound_string").test(key)) {
            val = { upperElev: properties[key] };
          }
          return { ...obj, ...val };
        }, {});

      dangerRatings.push(rating);
    }

    console.log(`dangerRatings is ${JSON.stringify(dangerRatings)}`);

    const level = dangerRatings
      .filter(
        (dangerRating) =>
          dangerRating.validTimePeriod === validTimePeriod ||
          dangerRating.validTimePeriod === "allDay"
      )
      .reduce((obj, dangerRating) => {
        let val;
        setLabel(
          dangerRating.lowerElev
            ? dangerRating.lowerElev
            : dangerRating.upperElev
        );
        if (dangerRating.upperElev) {
          val = { dangerRatingBelow: dangerRating.mainValue };
        } else if (dangerRating.lowerElev) {
          val = { dangerRatingAbove: dangerRating.mainValue };
        }
        return { ...obj, ...val };
      }, {});

    if (Object.keys(level).length === 2) {
      setRiskLevel(
        `${level.dangerRatingBelow}_${level.dangerRatingAbove}` as TDualRiskLevel
      );
    } else if (Object.keys(level).length === 1) {
      setRiskLevel(`0_${level.dangerRatingAbove}` as TDualRiskLevel);
    } else {
      setLabel("");
      setRiskLevel(`${dangerLevel}_${dangerLevel}` as TDualRiskLevel);
    }
  }, [properties]);

  return (
    <div>
      {riskLevel ? (
        <HorizontalBar>
          <img
            src={WarningLevels[riskLevel].uri}
            style={{ width: SIZE * 1.2, height: SIZE }}
          />
          {label ? (
            <Caption
              validDate={false}
              style={{
                display: "flex",
                flexWrap: "wrap",
                color: "black",
                alignContent: "center",
                fontSize: 12,
              }}
            >
              {label}
            </Caption>
          ) : null}
        </HorizontalBar>
      ) : null}
    </div>
  );
};

export default memo(BulletinRiskLevel);
