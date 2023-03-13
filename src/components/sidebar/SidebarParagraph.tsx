import React, { memo } from "react";
import { Container } from "../../styles/pages.style";
import { StyledH2 } from "../../styles/typography.style";

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
      {title ? <StyledH2 marginTop={`${marginTop}px`}>{title}</StyledH2> : null}
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};
export default memo(Paragraph);
