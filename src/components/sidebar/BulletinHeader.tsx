import React, { MouseEventHandler, memo } from "react";
import { ThemedCaption, Title } from "../../styles/typography.style";
import {
  CloseButton,
  DangerH2,
  DangerHeader,
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
    <Container>
      <HorizontalBar style={{ justifyContent: "flex-end" }}>
        <CloseButton onClick={onPress} />
      </HorizontalBar>
      <Title>{data.regionName}</Title>
      <ThemedCaption validDate={validDate < new Date() ? true : false}>
        Valid until: {gmtDate}
      </ThemedCaption>
      <DangerHeader level={String(level)}>
        <DangerH2 level={level}>
          Danger Level {level} - {rating}
        </DangerH2>
      </DangerHeader>
      <Divider />
    </Container>
  );
};

export default memo(BulletinHeader);
