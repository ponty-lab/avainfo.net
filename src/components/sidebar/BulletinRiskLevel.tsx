import React, { memo, useEffect } from "react";
import { WarningLevels } from "../../utils";
import { TDualRiskLevel } from "../../models";
import { Caption, Label } from "../../styles/typography.style";
import { HorizontalBar } from "../../styles/pages.style";
import { IconContainer } from "../../styles/sidebar.style";

const SIZE = 70;

type Props = {
  properties: any;
};

const BulletinRiskLevel: React.FC<Props> = ({ properties }) => {
  const [label, setLabel] = React.useState<string | undefined>(undefined);
  const [risk, setRisk] = React.useState<TDualRiskLevel | undefined>(undefined);
  const [labelPM, setLabelPM] = React.useState<string | undefined>(undefined);
  const [riskPM, setRiskPM] = React.useState<TDualRiskLevel | undefined>(
    undefined
  );
  const [caption, setCaption] = React.useState<boolean>(false);

  useEffect(() => {
    const dangerRatings = getDangerRatings(properties);
    console.log(`dangerRatings: ${JSON.stringify(dangerRatings)}`);

    const timePeriods = getValidTimePeriods(dangerRatings);
    console.log(`timePeriods: ${timePeriods}`);

    timePeriods.forEach((timePeriod: string) => {
      console.log(`timePeriod is ${timePeriod}`);
      const level = getRiskByElevation(dangerRatings, timePeriod);
      console.log(`level: ${JSON.stringify(level)}`);

      // Data for afternoon risk levels
      if (timePeriod === "later") {
        setCaption(true);
        setRiskPM(
          `${level.dangerRatingBelow}_${level.dangerRatingAbove}` as TDualRiskLevel
        );
        setLabelPM(level.elev ?? undefined);
      } else {
        // If no risk level for lower levels, set to 0
        const dangerRatingBelow = level.dangerRatingBelow ?? 0;
        console.log(`Setting dangerRatingBelow to ${dangerRatingBelow}`);
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
  }, [properties]);

  if (!risk) {
    return null;
  }

  return (
    <>
      <DangerIcon risk={risk} caption={caption} label={label} timePeriod="AM" />
      {riskPM ? (
        <DangerIcon
          risk={risk}
          caption={caption}
          label={labelPM}
          timePeriod="PM"
        />
      ) : null}
    </>
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
    <IconContainer>
      {caption ? <h4>{timePeriod}</h4> : null}
      <HorizontalBar style={{ marginLeft: "15px" }}>
        <img
          src={WarningLevels[risk].uri}
          style={{ width: SIZE * 1.2, height: SIZE }}
        />
        {label ? <Label>{label}</Label> : null}
      </HorizontalBar>
    </IconContainer>
  );
};

function getDangerRatings(properties: any) {
  const dangerRatings: Record<string, string>[] = [];

  // Returns all keys matching dangerRating
  const match = new RegExp("dangerRating_");
  const keys = Object.keys(properties).filter((key) => match.test(key) == true);

  // Loops through each dangerRating object up to a maximum of 4 coolections.
  // Danger Ratings can have a daytime dependency and/or an elevation dependency
  for (let i = 1; i <= properties.dangerRatings_count; i++) {
    const match = new RegExp(`dangerRating_${i}`);

    // Creates an object for each dangerRating with its
    // - numeric value
    // - validTimePeriod
    // - elevation lowerBound - optional
    // - elevation upperBound - optional
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

    // Pushes object to list of dangerRatings
    dangerRatings.push(rating);
  }

  return dangerRatings;
}

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
      if (dangerRating.upperElev) {
        val = {
          dangerRatingBelow: dangerRating.mainValue,
          elev: dangerRating.upperElev,
        };
      } else if (dangerRating.lowerElev) {
        val = {
          dangerRatingAbove: dangerRating.mainValue,
          elev: dangerRating.lowerElev,
        };
      } else {
        val = {
          dangerRatingAbove: dangerRating.mainValue,
          dangerRatingBelow: dangerRating.mainValue,
        };
      }
      return { ...obj, ...val };
    }, {});
}

export default memo(BulletinRiskLevel);
