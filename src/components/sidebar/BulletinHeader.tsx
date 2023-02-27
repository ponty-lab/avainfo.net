import React, { MouseEventHandler, memo, useEffect, useState } from "react";
import { ThemedCaption, Title } from "../../styles/typography.style";
import {
  CloseButton,
  DangerBanner,
  DangerText,
  Divider,
} from "../../styles/sidebar.style";
import { Container, HorizontalBar } from "../../styles/pages.style";
import { formatDate } from "../../utils/formatDate";

type Props = {
  data: any;
  onPress: MouseEventHandler<HTMLButtonElement>;
};

const BulletinHeader: React.FC<Props> = ({ data, onPress }) => {
  const validDate = new Date(data.validEndTime);
  const gmtDate = formatDate(data.validEndTime, "gmt");
  const level: number = data.maxDangerRating.allDay.numeric;
  const rating: string = data.maxDangerRating.allDay.string;

  return (
    <Container style={{ marginRight: 15 }}>
      <HorizontalBar style={{ justifyContent: "flex-end" }}>
        <CloseButton onClick={onPress} />
      </HorizontalBar>
      <Title>{data.regionName}</Title>
      <ThemedCaption validDate={validDate < new Date() ? true : false}>
        Valid until: {gmtDate}
      </ThemedCaption>
      <DangerBanner level={String(level)}>
        <DangerText level={level}>
          Danger Level {level} - {rating}
        </DangerText>
      </DangerBanner>
      <Divider />
    </Container>
  );
};

export default memo(BulletinHeader);
