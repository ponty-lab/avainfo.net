import React, { MouseEventHandler, memo } from "react";
import { ThemedCaption, Title } from "../../styles/typography.styles";
import {
  CloseButton,
  DangerH2,
  DangerHeader,
  Divider,
} from "../../styles/sidebar.style";
import { Container, HorizontalBar } from "../../styles/pages.style";
import { formatDate } from "../../utils/formatDate";

type Props = {
  properties: any;
  onPress: MouseEventHandler<HTMLButtonElement>;
};

const BulletinHeader: React.FC<Props> = ({ properties, onPress }) => {
  const validDate = new Date(properties.validEndTime);
  const gmtDate = formatDate(validDate);
  const level: number = properties?.maxDangerRating_allDay_numeric;
  const rating: string = properties?.maxDangerRating_allDay_string;

  return (
    <Container>
      <HorizontalBar style={{ justifyContent: "flex-end" }}>
        <CloseButton onClick={onPress} />
      </HorizontalBar>
      <Title>{properties.regionName}</Title>
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
