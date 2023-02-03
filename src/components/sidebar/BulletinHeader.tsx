import React, { memo } from "react";
import { Caption, Title } from "../../styles/typography.styles";
import { CloseButton, Divider, Header } from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { formatDate } from "../../utils/formatDate";
import BulletinDangerStatus from "./BulletinDangerStatus";

type HeaderProps = {
  region: string;
  onPress: () => void;
  validDate: Date;
  dangerColor: string;
  dangerLevel: string;
  dangerLevelString: string;
};

const BulletinHeader = ({
  region,
  onPress,
  validDate,
  dangerColor,
  dangerLevel,
  dangerLevelString,
}: HeaderProps) => {
  const gmtDate = formatDate(validDate);

  return (
    <div>
      <Header>
        <Title style={{ flex: "60%" }}>{toTitleCase(region)}</Title>
        <CloseButton onClick={onPress} />
      </Header>
      <BulletinDangerStatus
        dangerColor={dangerColor}
        dangerLevel={dangerLevel}
        dangerLevelString={dangerLevelString}
      />
      <Caption validDate={validDate < new Date() ? true : false}>
        Valid until: {gmtDate}
      </Caption>
      <Divider />
    </div>
  );
};

export default memo(BulletinHeader);
