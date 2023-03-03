import React from "react";
import { HorizontalBar } from "../styles/sidebar.style";
import { MdOutlineEmail } from "react-icons/md";
import { AppleBadge, GoogleBadge } from "../assets/badges";
import { Sketch } from "../assets";
import {
  AboutPage,
  Banner,
  H1White,
  H1Large,
  Content,
  LeftContent,
  H2Large,
  FooterContainer,
  RightContent,
  LeftFooter,
  EmailBar,
  RightFooter,
  LegalBar,
  CTA,
  TextWhite,
  PrivacyLink,
  AppleLink,
  AppleImg,
  GoogleLink,
  GoogleImg,
  SketchContainer,
} from "../styles/about.styles";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=net.avainfo&hl=en&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1";
const APPLE_STORE_URL =
  "https://apps.apple.com/us/app/avainfo/id1552158809?itsct=apps_box_badge&amp;itscg=30200";

const About = () => {
  const size = 250;
  return (
    <AboutPage>
      <Banner>
        <H1White>Get the Latest Avalanche Information</H1White>
        <H1Large>Anytime, Anywhere</H1Large>
      </Banner>
      <Content>
        <LeftContent>
          <H2Large>About</H2Large>
          <SketchContainer>
            <img
              src={Sketch}
              style={{
                width: size * 1.32,
                height: size,
              }}
            />
          </SketchContainer>
        </LeftContent>
        <RightContent>
          <h3>The App</h3>
          <p>
            Hey, I'm Carla. AvaInfo was inspired by my own love for backcountry
            skiing and my frustration with the limited availability of
            information on local avalanche conditions. That's why I first
            created AvaInfo, a mobile app that shares and searches local
            avalanche conditions for everyone to view. Why not download it and
            give it a try?
          </p>

          <h3>The Tileset</h3>
          <p>
            The AvaInfo Danger Map tileset provides an easy-to-use source for
            avalanche danger ratings pulled from various weather forecasters
            across Europe, updated daily to ensure you always have the latest
            information. The tileset is available for free and can be used in
            any non-commercial project.
          </p>
        </RightContent>
      </Content>
      <FooterContainer>
        <CTA>
          <LeftFooter>
            <H2Large>Say hello.</H2Large>
            <p>As a fellow mountain lover, I'm always happy to chat!</p>
            <EmailBar>
              <MdOutlineEmail size={30} style={{ marginRight: "20px" }} />
              <p>
                <strong>avainfo.net@gmail.com</strong>
              </p>
            </EmailBar>
          </LeftFooter>
          <RightFooter>
            <GoogleLink href={GOOGLE_PLAY_URL}>
              <GoogleImg alt="Get it on Google Play" src={GoogleBadge} />
            </GoogleLink>
            <AppleLink href={APPLE_STORE_URL}>
              <AppleImg src={AppleBadge} alt="Download on the App Store" />
            </AppleLink>
          </RightFooter>
        </CTA>
        <LegalBar>
          <TextWhite>
            Site design / logo @ 2023 AvaInfo |{" "}
            <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink>
          </TextWhite>
        </LegalBar>
      </FooterContainer>
    </AboutPage>
  );
};

export default About;
