import styled from "styled-components";
import Sketch from "../../assets/sketch.jpeg";
import { MediumTitle } from "../../styles/typography.style";
import { Wrapper } from "../../styles/pages.style";
import { device } from "../../utils/constants";

const SIZE = 250;

type Props = {
  flex?: string;
};

const Content = ({ flex }: Props) => {
  return (
    <ContentContainer flex={flex}>
      <LeftContent>
        <MediumTitle>About</MediumTitle>
        <SketchContainer>
          <img
            src={Sketch}
            style={{
              width: SIZE * 1.32,
              height: SIZE,
            }}
          />
        </SketchContainer>
      </LeftContent>
      <RightContent>
        <h3 style={{ marginTop: 26 }}>The App</h3>
        <p>
          Hey, I'm Carla. AvaInfo was inspired by my own love for backcountry
          skiing and my frustration with the limited availability of information
          on local avalanche conditions. That's why I first created AvaInfo, a
          mobile app that shares and searches local avalanche conditions for
          everyone to view. Why not download it and give it a try?
        </p>

        <h3>The Tileset</h3>
        <p>
          The AvaInfo Danger Map tileset provides an easy-to-use source for
          avalanche danger ratings pulled from various weather forecasters
          across Europe, updated daily to ensure you always have the latest
          information. The tileset is available for free and can be used in any
          non-commercial project.
        </p>
      </RightContent>
    </ContentContainer>
  );
};

const ContentContainer = styled(Wrapper)<{ flex?: string }>`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => flex || "auto"};
  margin-bottom: 30px;
  margin-top: 8px;

  @media screen and (${device.tablet}) {
    flex-direction: row;
  }
`;

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const LeftContent = styled(FlexContainer)`
  justify-content: space-between;
`;

const SketchContainer = styled(FlexContainer)`
  justify-content: center;
`;

const RightContent = styled(FlexContainer)`
  flex: 1;
  margin-top: 20px;
`;

export default Content;
