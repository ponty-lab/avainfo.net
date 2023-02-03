import React, { memo } from "react";
import { Divider, IconButton } from "../../styles/sidebar.style";
import { Caption, SubHeader, Footer } from "../../styles/typography.styles";

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
  return (
    <>
      <Divider style={styles.divider} />
      <div style={styles.acknowledgement}>
        <a href={url} style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#286882",
              fontSize: "16px",
            }}
          >
            Source: {source}
          </span>
          <Caption validDate={false} style={{ marginTop: "5px" }}>
            Issued {issuedDate}
          </Caption>
        </a>
        <a href={pdfURL}>
          <IconButton>
            <i className="fa fa-file-pdf-o"></i>
          </IconButton>
        </a>
        {/* <IconButton
          color="red"
          icon="file-pdf-box"
          size={40}
          onPress={() => handlePress(pdfURL)}
        /> */}
      </div>
    </>
  );
};

export default memo(BulletinFooter);

const styles = {
  divider: {
    marginTop: 20,
  },
  acknowledgement: {
    display: "flex",
    //flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
