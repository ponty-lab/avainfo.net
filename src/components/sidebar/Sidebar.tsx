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
import { device } from "../../utils/constants";
import { formatDate } from "../../utils/formatDate";

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
  const lastBulletinDate = formatDate(data?.lastBulletinDate, "gmt");
  const hasLastBulletinDate = data?.lastBulletinDate.length > 0;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

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
        <ScrollView ref={scrollRef}>
          <Header data={data} onPress={onPress} validDate={validDate} />

          <View>
            {validDate ? (
              <>
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
              </>
            ) : (
              <>
                <p>
                  {hasLastBulletinDate
                    ? `The most recent avalanche bulletin from ${data?.source} issued on ${lastBulletinDate} is no longer valid. `
                    : null}{" "}
                </p>
                <p>
                  Currently there is no up to date avalanche information
                  available
                  {!hasLastBulletinDate ? ` from ${data?.source}` : null}. Visit
                  their website for any further updates, or check back later.
                </p>

                <p>
                  Be careful when traveling in the backcountry and stay safe.
                </p>
                <Footer
                  url={data?.bulletinURI}
                  pdfURL={data?.pdfURI}
                  issuedDate={data?.publicationTime}
                  source={data?.source}
                />
              </>
            )}
          </View>
        </ScrollView>
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
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
  position: absolute;
  width: 100%;
  border-radius: 0px;
  top: 0px;
  left: 0px;
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 1000ms 1 forwards;
  z-index: 2;

  @media screen and (${device.tablet}) {
    top: 15px;
    left: 15px;
    width: 380px;
    border-radius: 4px 4px;
  }
`;

const SideBarView = styled.div<{ validDate: Date | undefined }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: ${(props) => (props.validDate ? "calc(100vh - 60px)" : "auto")};

  @media screen and (${device.tablet}) {
    height: ${(props) => (props.validDate ? "calc(100vh - 110px)" : "auto")};
  }
`;

const ScrollView = styled.div`
  overflow-y: auto;
`;

export default memo(Sidebar);
