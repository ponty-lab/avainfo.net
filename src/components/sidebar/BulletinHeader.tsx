import React, { MouseEventHandler, memo, useEffect, useState } from "react";
import { ThemedCaption, Title } from "../../styles/typography.style";
import {
  CloseButton,
  DangerBanner,
  DangerText,
  Divider,
  HeaderContainer,
} from "../../styles/sidebar.style";
import { HorizontalBar } from "../../styles/pages.style";
import { formatDate } from "../../utils/formatDate";

type Props = {
  data: any;
  onPress: MouseEventHandler<HTMLButtonElement>;
  validDate: Date | undefined;
};

const BulletinHeader: React.FC<Props> = ({ data, onPress, validDate }) => {
  const level: number = data.maxDangerRating.allDay.numeric;
  const rating: string = data.maxDangerRating.allDay.string;

  const Caption = () => {
    if (validDate) {
      const gmtDate = formatDate(data.validEndTime, "gmt");
      return (
        <ThemedCaption validDate={validDate < new Date() ? true : false}>
          Valid until: {gmtDate}
        </ThemedCaption>
      );
    }
    return null;
  };

  const text = validDate
    ? `Danger Level ${level} - ${rating}`
    : "No Danger Rating";

  return (
    <HeaderContainer>
      <HorizontalBar style={{ justifyContent: "flex-end" }}>
        <CloseButton onClick={onPress} />
      </HorizontalBar>
      <Title>{data.regionName}</Title>
      <Caption />
      <DangerBanner level={String(level)}>
        <DangerText level={level}>{text}</DangerText>
      </DangerBanner>
      <Divider />
    </HeaderContainer>
  );
};

export default memo(BulletinHeader);
