import React, { memo, useEffect } from "react";
import { WarningLevels } from "../../utils";
import { TDualRiskLevel } from "../../models";
import { HorizontalBar } from "../../styles/pages.style";
import { ElevationContainer, IconContainer } from "../../styles/sidebar.style";

const SIZE = 60;

type Props = {
  data: any;
};

const BulletinRiskLevel: React.FC<Props> = ({ data }) => {
  const [label, setLabel] = React.useState<string | undefined>(undefined);
  const [risk, setRisk] = React.useState<TDualRiskLevel | undefined>(undefined);
  const [labelPM, setLabelPM] = React.useState<string | undefined>(undefined);
  const [riskPM, setRiskPM] = React.useState<TDualRiskLevel | undefined>(
    undefined
  );
  const [caption, setCaption] = React.useState<boolean>(false);

  useEffect(() => {
    const dangerRatings = Object.keys(data)
      .filter((key) => key !== "count")
      .map((key) => data[key]);
    const timePeriods = getValidTimePeriods(dangerRatings);

    timePeriods.forEach((timePeriod: string) => {
      const level = getRiskByElevation(dangerRatings, timePeriod);

      // Data for afternoon risk levels
      if (timePeriod === "later") {
        setCaption(true);
        const label =
          level.dangerRatingBelow !== level.dangerRatingAbove && level.elev
            ? level.elev
            : undefined;
        setRiskPM(
          `${level.dangerRatingBelow}_${level.dangerRatingAbove}` as TDualRiskLevel
        );
        setLabelPM(label);
      } else {
        // If no risk level for lower levels, set to 0
        const dangerRatingBelow = level.dangerRatingBelow ?? 0;
        // console.log(
        //   `Setting dangerRatingBelow to ${JSON.stringify(dangerRatingBelow)}`
        // );
        //Sets elevation label for AM risk levels if available
        const label =
          dangerRatingBelow !== level.dangerRatingAbove && level.elev
            ? level.elev
            : undefined;
        const risk =
          `${dangerRatingBelow}_${level.dangerRatingAbove}` as TDualRiskLevel;

        setRisk(risk);
        setLabel(label);
      }
    });
  }, [data]);

  if (!data || !risk) {
    return null;
  }

  return (
    <HorizontalBar style={{ marginTop: 30 }}>
      <DangerIcon risk={risk} caption={caption} label={label} timePeriod="AM" />
      {riskPM ? (
        <DangerIcon
          risk={risk}
          caption={caption}
          label={labelPM}
          timePeriod="PM"
        />
      ) : null}
    </HorizontalBar>
  );
};

type DangerIconProps = {
  risk: TDualRiskLevel;
  caption: boolean;
  label?: string | undefined;
  timePeriod?: string | undefined;
};

const DangerIcon: React.FC<DangerIconProps> = ({
  risk,
  caption,
  label,
  timePeriod,
}) => {
  return (
    <IconContainer style={{ marginLeft: 15 }}>
      {caption ? <h4>{timePeriod}</h4> : null}
      <HorizontalBar style={{ marginLeft: "15px" }}>
        <img
          src={WarningLevels[risk].uri}
          style={{ width: SIZE * 1.2, height: SIZE }}
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

function getValidTimePeriods(dangerRatings: Record<string, any>[]): string[] {
  // Returns a list of validTimePeriods
  // either ['allDay'] or ['earlier', 'later']
  const validTimePeriod = new Set<string>();

  dangerRatings.forEach((dangerRating) =>
    validTimePeriod.add(dangerRating.validTimePeriod)
  );

  return Array.from(validTimePeriod);
}

function getRiskByElevation(
  dangerRatings: Record<string, any>[],
  validTimePeriod: string
) {
  return dangerRatings
    .filter((dangerRating) => dangerRating.validTimePeriod === validTimePeriod)
    .reduce((obj, dangerRating) => {
      let val;
      if (dangerRating.elevation?.upperBound) {
        val = {
          dangerRatingBelow: dangerRating.mainValue.numeric,
          elev: dangerRating.elevation.upperBound.string,
        };
      } else if (dangerRating.elevation?.lowerBound) {
        val = {
          dangerRatingAbove: dangerRating.mainValue.numeric,
          elev: dangerRating.elevation.lowerBound.string,
        };
      } else {
        val = {
          dangerRatingAbove: dangerRating.mainValue.numeric,
          dangerRatingBelow: dangerRating.mainValue.numeric,
        };
      }
      return { ...obj, ...val };
    }, {});
}

export default memo(BulletinRiskLevel);
