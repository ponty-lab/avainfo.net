import styled from "styled-components";

const Hero = () => {
  return (
    <HeroContainer>
      <HeroTitle>Get the Latest Avalanche Information</HeroTitle>
      <HeroSubtitle>Anytime, Anywhere</HeroSubtitle>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.1;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 72px 0px 42px;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  color: white;
  margin-top: 0px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const HeroSubtitle = styled(HeroTitle)`
  font-weight: 600;
  font-size: 42px;
`;

export default Hero;
