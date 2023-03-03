import styled from "styled-components";
import { Container, HorizontalBar } from "./pages.style";
import { Link } from "react-router-dom";

export const AboutPage = styled(Container)`
  flex: 1;
  justify-content: space-between;
  height: calc(100vh - 60px);
`;

export const Banner = styled(Container)`
  flex: 0.1;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 72px 0px 42px;
  align-items: center;
  text-align: center;
`;

export const H1White = styled.h1`
  color: white;
  margin-top: 0px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const H1Large = styled(H1White)`
  font-weight: 600;
  font-size: 42px;
`;

export const Content = styled(HorizontalBar)`
  flex: 0.4;
  margin: 0px 30px 30px;
  //max-width: 1200px;
  justify-content: space-around;
`;

export const LeftContent = styled(Container)`
  flex: 1;
`;

export const H2Large = styled.h1`
  font-weight: 500;
  margin-top: 30px;
`;

export const SketchContainer = styled(Container)`
  flex: 1;
  justify-content: "center";
`;

export const RightContent = styled(Container)`
  flex: 1;
  padding: 0px 10px;
  margin-top: 20px;
`;

export const Footer = styled(Container)`
  background: #d3d3d3;
`;

export const FooterContainer = styled(Footer)`
  flex: 0.5;
`;

export const FooterBar = styled(HorizontalBar)`
  background: #d3d3d3;
`;

export const CTA = styled(FooterBar)`
  flex: 1;
  margin-left: 30px;
`;

export const EmailBar = styled(FooterBar)`
  alignitems: "center";
`;

export const LeftFooter = styled(Footer)`
  flex: 1;
  margin-left: 5px;
`;

export const RightFooter = styled(FooterBar)`
  flex: 1;
  align-items: center;
`;

export const LegalBar = styled(HorizontalBar)`
  background: hsl(210, 8%, 12%);
  //background: #232b32;
  justify-content: center;
  flex: 0.2;
`;

export const TextWhite = styled.p`
  color: white;
  margin-top: 12px;
`;

export const PrivacyLink = styled(Link)`
  color: white;
`;

export const AppleLink = styled.a`
  display: inline-block;
  overflow: hidden;
  border-radius: 13px;
  width: 150px;
  height: auto;
`;

export const AppleImg = styled.img`
  border-radius: 13px;
  width: 150px;
  height: auto;
  margin: 12px 0px;
`;

export const GoogleLink = styled.a`
  width: 190px;
  height: auto;
  margin-left: 20px;
`;

export const GoogleImg = styled.img`
  width: 190px;
  height: auto;
`;
