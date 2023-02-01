import { format } from "date-fns";
import React, { memo } from "react";
import { Caption } from "../../styles/typography.styles";
import {
  ButtonClose,
  Divider,
  Header,
  Title,
} from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";

type HeaderProps = {
  region: string;
  onPress: () => void;
  validDate: Date;
};

const BulletinHeader = ({ region, onPress, validDate }: HeaderProps) => {
  const _getTime = (date: Date) => {
    if (date) {
      return format(date, "do MMMM, HH:mm (z)");
    }
    return null;
  };

  const _validDate = _getTime(validDate);

  return (
    <div>
      <Header>
        <Title style={{ flex: "70%" }}>{toTitleCase(region)}</Title>
        <ButtonClose onClick={onPress}>X</ButtonClose>
      </Header>
      <Caption validDate={validDate < new Date() ? true : false}>
        Valid until: {_validDate}
      </Caption>
      <Divider />
    </div>
  );
};

export default memo(BulletinHeader);
