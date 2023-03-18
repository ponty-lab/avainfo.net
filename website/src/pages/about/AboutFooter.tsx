import styled from "styled-components";
import GoogleBadgeIcon from "./AboutGoogleBadge";
import AppleBadgeIcon from "./AboutAppleBadge";
import { MediumTitle } from "../../styles/typography.style";
import { MdOutlineEmail } from "react-icons/md";
import { contactEmail, device } from "../../utils/constants";

type Props = {
  flex?: string;
};

const Footer = ({ flex }: Props) => {
  const mailto = `mailto:${contactEmail}`;
  return (
    <FooterContainer flex={flex}>
      <LeftFooter>
        <MediumTitle>Say hello.</MediumTitle>
        <p>As a fellow mountain lover, I'm always happy to chat!</p>
        <EmailBar>
          <a href={mailto}>
            <MdOutlineEmail size={30} style={{ marginRight: "10px" }} />
          </a>
          <span>
            <strong>{contactEmail}</strong>
          </span>
        </EmailBar>
      </LeftFooter>
      <RightFooter>
        <GoogleBadgeIcon />
        <AppleBadgeIcon />
      </RightFooter>
    </FooterContainer>
  );
};

export const FooterContainer = styled.div<{ flex?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: ${({ flex }) => flex || "auto"};
  background: #d3d3d3;
  padding: 10px 0px 20px;

  @media screen and (${device.tablet}) {
    flex-direction: row;
    align-items: center;
  }

  @media screen and (${device.laptop}) {
    justify-content: space-evenly;
  }
`;

export const EmailBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;

  @media screen and (${device.laptop}) {
    align-content: center;
  }
`;

export const RightFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0px 30px;

  @media screen and (${device.tablet}) {
    align-items: center;
    margin-right: 40px;
  }

  @media screen and (${device.mobileM}) {
    flex-direction: row;
    margin-top: 10px;
  }
`;

export default Footer;
