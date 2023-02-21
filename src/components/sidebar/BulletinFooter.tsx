import React, { memo } from "react";
import {
  Container,
  Divider,
  HorizontalBar,
  PDFButton,
} from "../../styles/sidebar.style";
import { Label, Footer, ThemedCaption } from "../../styles/typography.style";
import { formatDate } from "../../utils/formatDate";

type FooterProps = {
  url: string;
  pdfURL: string;
  source: string;
  issuedDate: string;
};

const BulletinFooter: React.FC<FooterProps> = ({
  url,
  pdfURL,
  source,
  issuedDate,
}) => {
  const date = formatDate(issuedDate, "gmt");
  return (
    <Footer>
      <Divider />
      <HorizontalBar style={{ justifyContent: "space-between" }}>
        <Container>
          <a href={url}>
            <ThemedCaption>Source: {source}</ThemedCaption>
            {date ? <Label>Issued on: {date}</Label> : null}
          </a>
        </Container>
        <a href={pdfURL}>
          <PDFButton className="fa fa-file-pdf-o" />
        </a>
      </HorizontalBar>
    </Footer>
  );
};

export default memo(BulletinFooter);
