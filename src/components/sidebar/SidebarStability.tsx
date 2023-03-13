import React, { memo } from "react";
import Paragraph from "./SidebarParagraph";
import { TStability } from "../../models";
import { StyledH2, StyledH3 } from "../../styles/typography.style";

type Props = {
  stability: TStability[] | undefined;
};

const Stability: React.FC<Props> = ({ stability }) => {
  if (!stability) {
    return null;
  }

  return (
    <>
      <StyledH2>Snow Stability</StyledH2>
      {stability.map((activity, index: number) => (
        <div key={`stability_${index}`}>
          {activity.highlight ? (
            <StyledH3 key={`h3_${index}`}>{activity.highlight}</StyledH3>
          ) : null}
          <Paragraph key={`para_${index}`} content={activity.comment} />
        </div>
      ))}
    </>
  );
};

export default memo(Stability);
