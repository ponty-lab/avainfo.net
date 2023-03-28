import React, { ReactNode } from "react";
import styled from "styled-components";
import { WhiteText } from "../../styles/typography.style";

type LegalProps = {
  flex?: string;
  children: ReactNode;
};

const Legal: React.FC<LegalProps> = ({ children, flex }) => {
  return (
    <LegalBar flex={flex}>
      <WhiteText>{children}</WhiteText>
    </LegalBar>
  );
};

export const LegalBar = styled.div<{ flex?: string }>`
  display: flex;
  flex-direction: row;
  background: hsl(210, 8%, 12%);
  justify-content: center;
  align-items: center;
  padding: 0px 40px 25px 40px;
  flex: ${({ flex }) => flex || "auto"};
`;

export default Legal;
