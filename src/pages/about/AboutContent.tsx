import styled from "styled-components";
import { Sketch } from "../../assets";
import { MediumTitle } from "../../styles/typography.style";

const SIZE = 250;

const Content = () => {
  return (
    <ContentContainer>
      <FlexContainer>
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
      </FlexContainer>
      <RightContent>
        <h3>The App</h3>
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.4;
  margin: 0px 30px 30px;
  justify-content: space-around;
`;

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SketchContainer = styled(FlexContainer)`
  justify-content: "center";
`;

const RightContent = styled(FlexContainer)`
  padding: 0px 10px;
  margin-top: 20px;
`;

export default Content;
