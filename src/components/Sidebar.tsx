import {
  ColumnColor,
  HorizontalBar,
  Page,
  ScrollBar,
  SidebarContainer,
  SubHeader,
} from "../styles/sidebar.style";
import AvaColors from "../styles/colors.style";
import BulletinHeader from "./sidebar/BulletinHeader";
import { hexToRGB } from "../utils/hexToRGB";
import BulletinParagraph from "./sidebar/BulletinParagraph";
import BulletinFooter from "./sidebar/BulletinFooter";
import BulletinRiskLevel from "./sidebar/BulletinRiskLevel";
import BulletinTendency from "./sidebar/BulletinTendency";
import BulletinDangerStatus from "./sidebar/BulletinDangerStatus";
import BulletinAvalancheProblems from "./sidebar/BulletinAvalancheProblems";
import BulletinStability from "./sidebar/BulletinStability";
import BulletinWeather from "./sidebar/BulletinWeather";

type Props = {
  properties: Record<string, any> | null;
  onPress: () => void;
  validTimePeriod: string;
};

const DangerName: Record<number, string> = {
  0: "No Snow",
  1: "Low",
  2: "Moderate",
  3: "Considerable",
  4: "High",
  5: "Very High",
};

const Sidebar = ({ properties, onPress, validTimePeriod }: Props) => {
  const dangerLevel =
    validTimePeriod === "earlier"
      ? properties?.maxDangerRating_earlier_numeric
      : properties?.maxDangerRating_later_numeric;

  const dangerLevelString =
    validTimePeriod === "earlier"
      ? properties?.maxDangerRating_earlier_string
      : properties?.maxDangerRating_later_string;

  const validDate = properties?.validEndTime
    ? new Date(properties.validEndTime)
    : undefined;

  const dangerColor = hexToRGB(AvaColors[dangerLevel], "0.9");

  return (
    <div>
      {validDate ? (
        <SidebarContainer>
          <Page>
            <BulletinHeader
              region={properties?.regionName}
              onPress={onPress}
              validDate={validDate}
            />
            <ScrollBar>
              <Page margin={"10px"}>
                <BulletinDangerStatus
                  dangerColor={dangerColor}
                  dangerLevel={dangerLevel}
                  dangerLevelString={dangerLevelString}
                />
                <HorizontalBar>
                  <ColumnColor dangerColor={dangerColor} />
                  <div style={{ flex: 1 }}>
                    <BulletinParagraph
                      title="Summary"
                      content={properties?.highlights}
                    />
                  </div>
                </HorizontalBar>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    alignItems: "center",
                    flex: "1",
                    justifyContent: "center",
                  }}
                >
                  <BulletinRiskLevel
                    properties={properties}
                    validTimePeriod={validTimePeriod}
                    dangerLevel={dangerLevel}
                  />
                  {properties?.tendencyType ? (
                    <BulletinTendency
                      tendency={properties?.tendencyType}
                      validDate={validDate}
                    />
                  ) : null}
                </div>
                <BulletinParagraph
                  title="Snow Quality"
                  content={properties?.snowpackStructureComment}
                />
                <BulletinAvalancheProblems
                  properties={properties}
                  validTimePeriod={validTimePeriod}
                />
                <BulletinStability properties={properties} />
                <BulletinWeather properties={properties} />
                <BulletinFooter
                  url={properties?.bulletinURI}
                  pdfURL={properties?.pdfURI}
                  issuedDate={properties?.publicationTime}
                  source={properties?.source}
                />
              </Page>
            </ScrollBar>
          </Page>
        </SidebarContainer>
      ) : (
        <SidebarContainer>
          <Page>
            <h1>No data</h1>
          </Page>
        </SidebarContainer>
      )}
    </div>
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
