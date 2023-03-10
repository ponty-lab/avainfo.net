import { Link } from "react-router-dom";
import styled from "styled-components";
import Hero from "./AboutHero";
import Content from "./AboutContent";
import Footer from "./AboutFooter";
import Legal from "../../components/legal";
import { ScrollView } from "../../styles/pages.style";

const About = () => {
  return (
    <AboutPage>
      <ScrollView
        style={{
          height: "calc(100vh - 60px)",
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Hero />
        <Content />
        <Footer />
        <Legal>
          <>
            Site design / logo @ 2023 AvaInfo |{" "}
            <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink>
          </>
        </Legal>
      </ScrollView>
    </AboutPage>
  );
};

const AboutPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  height: calc(100vh - 60px);
`;

export const PrivacyLink = styled(Link)`
  color: white;
`;

export default About;
