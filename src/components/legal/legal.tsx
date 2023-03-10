import React, { ReactNode } from "react";
import styled from "styled-components";
import { WhiteText } from "../../styles/typography.style";

type LegalProps = {
  children: ReactNode;
};

const Legal: React.FC<LegalProps> = ({ children }) => {
  return (
    <LegalBar>
      <WhiteText>{children}</WhiteText>
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

export default Legal;
