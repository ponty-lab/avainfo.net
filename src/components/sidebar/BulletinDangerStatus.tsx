import { memo } from "react";
import { DangerHeader } from "../../styles/sidebar.style";
import AvaColors from "../../styles/colors.style";

type Props = {
  properties: any;
};

const BulletinDangerStatus = ({ properties }: Props) => {
  const dangerLevel = properties?.maxDangerRating_allDay_numeric;
  const dangerLevelString = properties?.maxDangerRating_allDay_string;
  return (
    <div
      style={{
        //display: "flex",
        //flex: 0,
        marginTop: 20,
        background: AvaColors[dangerLevel],
        borderRadius: 4,
        padding: 2,
        textAlign: "center",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
      }}
    >
      <DangerHeader dangerLevel={dangerLevel}>
        Danger Level {dangerLevel} - {dangerLevelString}
      </DangerHeader>
    </div>
  );
};

export default memo(BulletinDangerStatus);
