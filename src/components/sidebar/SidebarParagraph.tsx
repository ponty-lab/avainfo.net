import React, { memo } from "react";
import { Container } from "../../styles/pages.style";

type SummaryProps = {
  title?: string;
  content: string;
  marginTop?: string;
};

const Paragraph: React.FC<SummaryProps> = ({ title, content, marginTop }) => {
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
export default memo(Paragraph);
