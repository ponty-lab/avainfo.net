import React, { memo } from "react";
import { SubHeader } from "../../styles/typography.styles";

type SummaryProps = {
  title?: string;
  content: string;
};

const BulletinParagraph: React.FC<SummaryProps> = ({ title, content }) => {
  if (!content) {
    return null;
  }
  return (
    <div>
      {title ? (
        <SubHeader style={{ marginBottom: 0 }}>{title}</SubHeader>
      ) : null}
      <p
        style={{ fontSize: "15px" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
export default memo(BulletinParagraph);
