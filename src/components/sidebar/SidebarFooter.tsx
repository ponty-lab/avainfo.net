import React, { memo } from "react";
import { Container, Divider, HorizontalBar } from "../../styles/pages.style";
import { Label, ThemedCaption } from "../../styles/typography.style";
import { formatDate } from "../../utils/formatDate";
import styled from "styled-components";
import { hexToRGB } from "../../utils/hexToRGB";
import { FaFilePdf } from "react-icons/fa";

type FooterProps = {
  url: string;
  pdfURL: string;
  source: string;
  issuedDate: string;
};

const Footer: React.FC<FooterProps> = ({ url, pdfURL, source, issuedDate }) => {
  const pdfSize = 40;
  const date = formatDate(issuedDate, "gmt");
  return (
    <FooterContainer>
      <Divider />
      <HorizontalBar style={{ justifyContent: "space-between" }}>
        <Container style={{ flex: 0.9 }}>
          <a href={url}>
            <ThemedCaption>Source: {source}</ThemedCaption>
          </a>
          {date ? (
            <Label style={{ fontSize: 12 }}>Issued on: {date}</Label>
          ) : null}
        </Container>
        <a href={pdfURL}>
          <PDFButton size={pdfSize} />
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

const PDFButton = styled(FaFilePdf)`
  color: ${(props) => hexToRGB(props.theme.colors.accent, "1")};
  margin: 15px 0px 0px 0px;
  cursor: pointer;

  /* Lighter color on mouse-over */
  &:hover {
    color: ${(props) => hexToRGB(props.theme.colors.accent, "0.8")};
  }
`;

export default memo(Footer);
