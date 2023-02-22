import React, { memo, useEffect, useState } from "react";
import BulletinParagraph from "./BulletinParagraph";

type Props = {
  data: any;
};

const BulletinStability: React.FC<Props> = ({ data }) => {
  const [stability, setStability] = useState<Record<string, string>[] | null>(
    null
  );

  useEffect(() => {
    const stability: Record<string, string>[] = Object.values(data);
    setStability(stability);
  }, [data]);

  if (!stability) {
    return null;
  }

  return (
    <>
      <h3>Snow Stability</h3>
      {stability.map((activity, index: number) => (
        <div key={`stability_${index}`}>
          {activity.highlight ? (
            <h4 key={`h4_${index}`}>{activity.highlight}</h4>
          ) : null}
          <BulletinParagraph key={`para_${index}`} content={activity.comment} />
        </div>
      ))}
    </>
  );
};

export default memo(BulletinStability);
