import styled from "styled-components";
import GoogleBadgeIcon from "./AboutGoogleBadge";
import AppleBadgeIcon from "./AboutAppleBadge";
import { MediumTitle } from "../../styles/typography.style";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <FooterContainer>
      <LeftFooter>
        <MediumTitle>Say hello.</MediumTitle>
        <p>As a fellow mountain lover, I'm always happy to chat!</p>
        <EmailBar>
          <MdOutlineEmail size={30} style={{ marginRight: "20px" }} />
          <p style={{ marginBottom: 0 }}>
            <strong>avainfo.net@gmail.com</strong>
          </p>
        </EmailBar>
      </LeftFooter>
      <RightFooter>
        <GoogleBadgeIcon />
        <AppleBadgeIcon />
      </RightFooter>
    </FooterContainer>
  );
};

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  background: #d3d3d3;
`;

export const FooterBar = styled.div`
  display: flex;
  flex-direction: row;
  background: #d3d3d3;
`;

export const FooterContainer = styled(FooterBar)`
  flex: 0.5;
`;

export const EmailBar = styled(FooterBar)`
  align-items: center;
`;

export const LeftFooter = styled(FooterColumn)`
  flex: 1;
  margin-left: 35px;
`;

export const RightFooter = styled(FooterBar)`
  flex: 1;
  align-items: center;
`;

export default Footer;
