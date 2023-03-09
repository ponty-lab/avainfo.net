import styled from "styled-components";
import Hero from "./AboutHero";
import Content from "./AboutContent";
import Footer from "./AboutFooter";
import Legal from "./AboutLegal";

const About = () => {
  return (
    <AboutPage>
      <Hero />
      <Content />
      <Footer />
      <Legal />
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

export default About;
