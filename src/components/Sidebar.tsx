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
  properties: Record<string, any> | null;
  data: Record<string, any> | null;
  onPress: () => void;
  validTimePeriod: string;
};

const Sidebar = ({ properties, data, onPress, validTimePeriod }: Props) => {
  const dangerLevel = data?.maxDangerRating.allDay.numeric;
  const dangerColor = hexToRGB(AvaColors[dangerLevel], "0.9");

  const validDate = data?.validEndTime
    ? new Date(data?.validEndTime)
    : undefined;

  return (
    <>
      {validDate ? (
        <SidebarContainer>
          <View style={{ height: "calc(100vh - 110px)" }}>
            <BulletinHeader data={data} onPress={onPress} />
            <ScrollView>
              <View style={{ marginLeft: 0, marginRight: 10 }}>
                <HorizontalBar style={{ flex: 0 }}>
                  <ColorColumn dangerColor={dangerColor} />
                  <BulletinParagraph
                    title="Summary"
                    content={data?.highlights}
                    marginTop="20px"
                  />
                </HorizontalBar>
                <WrappedIconContainer>
                  <BulletinRiskLevel data={data?.dangerRating} />
                  <BulletinTendency
                    tendency={data?.tendencyType}
                    validDate={data?.validEndTime}
                  />
                </WrappedIconContainer>
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
        <SidebarContainer>
          <View style={{ height: "calc(100vh - 110px)" }}>
            <h1>No data</h1>
          </View>
        </SidebarContainer>
      )}
    </>
  );
};

export default Sidebar;

// <div
//   className="sidebar"
//   style={{
//     backgroundColor: AvaColors[dangerLevel],
//     opacity: 0.65,
//     borderBottomColor: AvaColors[dangerLevel],
//     borderLeftColor: AvaColors[dangerLevel],
//     borderLeftStyle: "solid",
//     borderLeftWidth: 5,
//     borderBottomStyle: "solid",
//     borderBottomWidth: 3,
//   }}
// >
//   {props.regionName} | {DangerName[dangerLevel]}
// </div>
