import styled from "styled-components";
import GoogleBadge from "../../assets/badges/google-play-badge.png";

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=net.avainfo&hl=en&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1";

const GoogleBadgeIcon = () => {
  return (
    <GoogleLink href={GOOGLE_PLAY_URL}>
      <GoogleImg alt="Get it on Google Play" src={GoogleBadge} />
    </GoogleLink>
  );
};

export const GoogleLink = styled.a`
  width: 190px;
  height: auto;
  margin-left: 20px;
`;

export const GoogleImg = styled.img`
  width: 190px;
  height: auto;
`;

export default GoogleBadgeIcon;
