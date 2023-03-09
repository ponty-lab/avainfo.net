import styled from "styled-components";
import AppleBadge from "../../assets/badges/apple-badge.svg";

const APPLE_STORE_URL =
  "https://apps.apple.com/us/app/avainfo/id1552158809?itsct=apps_box_badge&amp;itscg=30200";

const AppleBadgeIcon = () => {
  return (
    <AppleLink href={APPLE_STORE_URL}>
      <AppleImg src={AppleBadge} alt="Download on the App Store" />
    </AppleLink>
  );
};

const AppleLink = styled.a`
  display: inline-block;
  overflow: hidden;
  border-radius: 13px;
  width: 150px;
  height: auto;
`;

const AppleImg = styled.img`
  border-radius: 13px;
  width: 150px;
  height: auto;
  margin: 12px 0px;
`;

export default AppleBadgeIcon;
