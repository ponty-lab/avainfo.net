import React, { memo } from "react";
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
      {title ? <h2 style={{ marginTop }}>{title}</h2> : null}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};
export default memo(BulletinParagraph);
