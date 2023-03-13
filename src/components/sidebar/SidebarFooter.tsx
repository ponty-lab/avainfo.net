import React, { memo } from "react";
import { Container, Divider, HorizontalBar } from "../../styles/pages.style";
import { Label, ThemedCaption } from "../../styles/typography.style";
import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import { hexToRGB } from "../../utils/hexToRGB";

type FooterProps = {
  url: string;
  pdfURL: string;
  source: string;
  issuedDate: string;
};

const Footer: React.FC<FooterProps> = ({ url, pdfURL, source, issuedDate }) => {
  const date = formatDate(issuedDate, "gmt");
  return (
    <FooterContainer>
      <Divider />
      <HorizontalBar style={{ justifyContent: "space-between" }}>
        <Container>
          <a href={url}>
            <ThemedCaption>Source: {source}</ThemedCaption>
          </a>
          {date ? (
            <Label style={{ fontSize: 12 }}>Issued on: {date}</Label>
          ) : null}
        </Container>
        <a href={pdfURL}>
          <PDFButton className="fa fa-file-pdf-o" />
        </a>
      </HorizontalBar>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  &:before {
    background: gray;
    color: #fff;
    display: block;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const PDFButton = styled.i`
  background-color: ${(props) => hexToRGB(props.theme.colors.accent, "1")};
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 4px;
  margin: 15px 0px 0px 0px;
  cursor: pointer;

  /* Darker background on mouse-over */
  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;

export default memo(Footer);
