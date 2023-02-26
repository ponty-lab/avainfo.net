import React from "react";
import { Page } from "../styles/pages.style";
import { Container, HorizontalBar } from "../styles/sidebar.style";
import { Title } from "../styles/typography.style";

const About = () => {
  const size = 250;
  return (
    <Page>
      <Title style={{ fontSize: 60, fontWeight: 500 }}>About</Title>
      <HorizontalBar>
        <img
          src={require("../assets/drawing.jpeg")}
          style={{ width: size * 1.32, height: size }}
        />
        <Container style={{ marginLeft: 50 }}>
          <p>
            My name is Carla, and I'm a backcountry skier who loves exploring
            the mountains. But I also understand the risks and challenges that
            come with backcountry travel, which is why I created this website.
            At the heart of my website is my vector layer showing avalanche
            danger ratings.That's why I created this website to provide you with
            the tools you need to make informed decisions about backcountry
            travel.
          </p>

          <p>
            As an avid backcountry traveler myself, I know how important it is
            to have access to accurate and up-to-date information about the
            conditions in your chosen area. That's why I pull data from
            different European weather forecasters and compile it into one
            easy-to-use source.
          </p>

          <p>
            I originally built an app to share local avalanche conditions after
            realising how difficult it was to access reliable and up-to-date
            information about the local avalnche conditions. My goal is to
            provide this information from one easy-to-use source. I wanted to
            create a resource that could help other mountain enthusiasts make
            informed decisions about where to travel and what precautions to
            take. And so, I started producing my own avalanche danger rating
            layers, which are updated regularly to provide you with the latest
            information.
          </p>

          <p>
            Thanks for stopping by my website, and I hope you find it useful. If
            you have any questions or feedback, please don't hesitate to get in
            touch. I'm always happy to chat with other mountain lovers!
          </p>
        </Container>
      </HorizontalBar>
    </Page>
  );
};

export default About;
