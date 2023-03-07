import React, { memo, useEffect, useRef } from "react";
import AvaColors from "../styles/colors.style";
import { HorizontalBar, View } from "../styles/pages.style";
import {
  ColorColumn,
  ScrollView,
  SideBarView,
  SidebarContainer,
} from "../styles/sidebar.style";
import { hexToRGB } from "../utils/hexToRGB";
import {
  AvalancheProblems,
  Footer,
  Header,
  Paragraph,
  RiskLevel,
  Stability,
  Tendency,
  Weather,
} from "./bulletin";

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
              <RiskLevel dangerRatings={data?.dangerRating} />
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

export default memo(Sidebar);
