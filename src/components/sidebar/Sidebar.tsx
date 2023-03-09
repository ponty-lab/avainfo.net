import React, { memo, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import AvaColors from "../../styles/colors.style";
import { HorizontalBar, View } from "../../styles/pages.style";
import { hexToRGB } from "../../utils/hexToRGB";
import Header from "./SidebarHeader";
import Footer from "./SidebarFooter";
import Weather from "./SidebarWeather";
import AvalancheProblems from "./SidebarAvalancheProblems";
import Stability from "./SidebarStability";
import Tendency from "./SidebarTendency";
import RiskLevel from "./SidebarRiskLevel";
import Paragraph from "./SidebarParagraph";

type Props = {
  data: Record<string, any> | null;
  onPress: () => void;
  visible: boolean;
};

const Sidebar: React.FC<Props> = ({ data, onPress, visible }) => {
  const dangerLevel = data?.maxDangerRating.allDay.numeric;
  const dangerColor = hexToRGB(AvaColors[dangerLevel], "0.9");
  const validDate = data?.validEndTime
    ? new Date(data?.validEndTime)
    : undefined;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <SidebarContainer show={visible}>
      <SideBarView validDate={validDate}>
        <Header data={data} onPress={onPress} validDate={validDate} />
        {validDate ? (
          <ScrollView ref={scrollRef}>
            <View>
              <HorizontalBar style={{ flex: 0 }}>
                <ColorColumn dangerColor={dangerColor} />
                <Paragraph
                  title="Summary"
                  content={data?.highlights}
                  marginTop="20px"
                />
              </HorizontalBar>
              <RiskLevel dangerRatingInfo={data?.dangerRatingImageInfo} />
              <Tendency
                tendency={data?.tendencyType}
                validDate={data?.validEndTime}
              />
              <Stability stability={data?.avalancheActivity} />
              <AvalancheProblems problems={data?.avalancheProblem} />
              <Paragraph
                title="Snow Quality"
                content={data?.snowpackStructureComment}
              />
              <Weather weather={data?.weather} />
              <Footer
                url={data?.bulletinURI}
                pdfURL={data?.pdfURI}
                issuedDate={data?.publicationTime}
                source={data?.source}
              />
            </View>
          </ScrollView>
        ) : null}
      </SideBarView>
    </SidebarContainer>
  );
};

const ColorColumn = styled.div<{ dangerColor: string }>`
  min-width: 10px;
  background: ${(props) => props.dangerColor};
  border-radius: 2px;
  margin: 20px 10px 0px 0px;
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
    visibility: visible;
  }
  100% {
    opacity: 1;
  }
`;

const SidebarContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  position: absolute;
  top: 15px;
  left: 15px;
  width: 380px;
  border-radius: 4px 4px;
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 1000ms 1 forwards;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100vw;
    border-radius: 0px;
    top: 0px;
    left: 0px;
  }
`;

const SideBarView = styled(View)<{ validDate: Date | undefined }>`
  height: ${(props) => (props.validDate ? "calc(100vh - 115px)" : "auto")};
  margin: 10px 0px 10px 20px;

  @media (max-width: 768px && min-width: 414px) {
    margin: 10px 70px;
  }

  @media (max-width: 414px) {
    margin: 10px 15px 10px 20px;
  }

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const ScrollView = styled.div`
  display: flex;
  margin: 0px 0px 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin: 0px 0px 0px;
  }
`;

export default memo(Sidebar);
