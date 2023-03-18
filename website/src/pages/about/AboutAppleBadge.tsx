import styled from "styled-components";
import AppleBadge from "../../assets/badges/apple-badge.svg";
import { device } from "../../utils/constants";

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
  margin-left: 10px;
  width: 170px;
  height: auto;

  @media screen and (${device.mobileM}) {
    margin-left: 0px;
    width: 150px;
  }
`;

const AppleImg = styled.img`
  border-radius: 13px;
  width: 170px;
  height: auto;
  margin: 12px 0px;

  @media screen and (${device.mobileM}) {
    width: 155px;
  }
`;

export default AppleBadgeIcon;
