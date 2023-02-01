import { memo } from "react";
import { SubHeader } from "../../styles/sidebar.style";

type Props = {
  dangerColor: string;
  dangerLevel: string;
  dangerLevelString: string;
};

const BulletinDangerStatus = ({
  dangerColor,
  dangerLevel,
  dangerLevelString,
}: Props) => {
  return (
    <SubHeader
      style={{
        backgroundColor: dangerColor,
        borderRadius: "4px",
        padding: "5px",
      }}
    >
      Danger Level {dangerLevel} - {dangerLevelString}
    </SubHeader>
  );
};

export default memo(BulletinDangerStatus);
