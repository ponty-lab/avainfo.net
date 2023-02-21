import React, { memo } from "react";
import { H3 } from "../../styles/typography.style";
import { Container } from "../../styles/sidebar.style";

type SummaryProps = {
  title?: string;
  content: string;
  marginTop?: string;
};

const BulletinParagraph: React.FC<SummaryProps> = ({
  title,
  content,
  marginTop,
}) => {
  if (!content) {
    return null;
  }

  return (
    <Container>
      {title ? <H3 marginTop={marginTop}>{title}</H3> : null}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};
export default memo(BulletinParagraph);
