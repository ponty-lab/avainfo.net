import React, { MouseEventHandler, memo } from "react";
import styled from "styled-components";
import { ThemedCaption, Title } from "../../styles/typography.style";
import { HorizontalBar, Divider } from "../../styles/pages.style";
import { formatDate } from "../../utils/formatDate";
import { hexToRGB } from "../../utils/hexToRGB";
import AvaColors from "../../styles/colors.style";

type Props = {
  data: any;
  onPress: MouseEventHandler<HTMLButtonElement>;
  validDate: Date | undefined;
};

const Header: React.FC<Props> = ({ data, onPress, validDate }) => {
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;

  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const CloseButton = styled.button`
  display: flex;
  overflow: hidden;
  position: relative;
  border: none;
  padding: 0;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  font: inherit;
  text-indent: 100%;
  cursor: pointer;
  content: "X";

  &:hover {
    background: ${(props) => hexToRGB(props.theme.colors.primary, "0.1")};
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - 0.0625em);
    width: 0.125em;
    height: 70%;
    transform: rotate(45deg);
    background: currentcolor;
    content: "";
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const DangerBanner = styled.div<{ level: string }>`
  margin-top: 10px;
  margin-right: 5px;
  background: ${(props) => AvaColors[props.level]};
  border-radius: 4px;
  padding: 2px;
  text-align: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

const DangerText = styled.span<{ level: number }>`
  font-weight: 700;
  font-size: 20px;
  padding: 1px 0px;
  line-height: 26px;
  font-weight: ${(props) =>
    props.level === 4 || props.level === 5 ? 600 : 500};
  margin: 0;
  color: ${(props) =>
    props.level === 4 || props.level === 5 ? "white" : "black"};
`;

export default memo(Header);
