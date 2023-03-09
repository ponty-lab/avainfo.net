import { Link } from "react-router-dom";
import styled from "styled-components";
import { WhiteText } from "../../styles/typography.style";

const Legal = () => {
  return (
    <LegalBar>
      <WhiteText>
        Site design / logo @ 2023 AvaInfo |{" "}
        <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink>
      </WhiteText>
    </LegalBar>
  );
};

export const LegalBar = styled.div`
  display: flex;
  flex-direction: row;
  background: hsl(210, 8%, 12%);
  //background: #232b32;
  justify-content: center;
  flex: 0.1;
`;

export const PrivacyLink = styled(Link)`
  color: white;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    z-index: 1;
  }
`;

export default Legal;
