import { useEffect, useRef, useState } from "react";
import {
  ColorColumn,
  WrappedIconContainer,
  ScrollView,
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

const Sidebar = ({ data, onPress, visible }: Props) => {
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

  return (
    <>
      {validDate ? (
        <SidebarContainer visible={visible}>
          <View style={{ height: "calc(100vh - 100px)" }}>
            <BulletinHeader data={data} onPress={onPress} />
            <ScrollView ref={scrollRef}>
              <View style={{ marginLeft: 0, marginRight: 15 }}>
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
          </View>
        </SidebarContainer>
      ) : (
        <SidebarContainer visible={visible}>
          <View style={{ height: "calc(100vh - 110px)" }}>
            <h1>No data</h1>
          </View>
        </SidebarContainer>
      )}
    </>
  );
};

export default Sidebar;
