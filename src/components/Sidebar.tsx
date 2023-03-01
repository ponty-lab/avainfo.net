import React, { memo, useEffect, useRef, useState } from "react";
import {
  ColorColumn,
  ScrollView,
  SideBarView,
  SidebarContainer,
} from "../styles/sidebar.style";
import { HorizontalBar, View } from "../styles/pages.style";
import AvaColors from "../styles/colors.style";
import BulletinHeader from "./sidebar/BulletinHeader";
import { hexToRGB } from "../utils/hexToRGB";
import BulletinParagraph from "./sidebar/BulletinParagraph";
import BulletinFooter from "./sidebar/BulletinFooter";
import BulletinRiskLevel from "./sidebar/BulletinRiskLevel";
import BulletinTendency from "./sidebar/BulletinTendency";
import BulletinAvalancheProblems from "./sidebar/BulletinAvalancheProblems";
import BulletinStability from "./sidebar/BulletinStability";
import BulletinWeather from "./sidebar/BulletinWeather";

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
        <BulletinHeader data={data} onPress={onPress} validDate={validDate} />
        {validDate ? (
          <ScrollView ref={scrollRef}>
            <View>
              <HorizontalBar style={{ flex: 0 }}>
                <ColorColumn dangerColor={dangerColor} />
                <BulletinParagraph
                  title="Summary"
                  content={data?.highlights}
                  marginTop="20px"
                />
              </HorizontalBar>
              <BulletinRiskLevel data={data?.dangerRating} />
              <BulletinTendency
                tendency={data?.tendencyType}
                validDate={data?.validEndTime}
              />
              <BulletinStability data={data?.avalancheActivity} />
              <BulletinAvalancheProblems data={data?.avalancheProblem} />
              <BulletinParagraph
                title="Snow Quality"
                content={data?.snowpackStructureComment}
              />
              <BulletinWeather data={data?.weather} />
              <BulletinFooter
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

export default memo(Sidebar);
