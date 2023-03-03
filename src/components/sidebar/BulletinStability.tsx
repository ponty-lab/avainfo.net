import React, { memo } from "react";
import BulletinParagraph from "./BulletinParagraph";
import { TStability } from "../../models";

type Props = {
  stability: TStability[] | undefined;
};

const BulletinStability: React.FC<Props> = ({ stability }) => {
  if (!stability) {
    return null;
  }

  return (
    <>
      <h2>Snow Stability</h2>
      {stability.map((activity, index: number) => (
        <div key={`stability_${index}`}>
          {activity.highlight ? (
            <h3 key={`h3_${index}`}>{activity.highlight}</h3>
          ) : null}
          <BulletinParagraph key={`para_${index}`} content={activity.comment} />
        </div>
      ))}
    </>
  );
};

export default memo(BulletinStability);
