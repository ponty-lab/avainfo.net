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
    const stability: Record<string, string>[] = Object.keys(data)
      .filter((key) => key !== "count")
      .map((key) => data[key]);
    setStability(stability);
  }, [data]);

  if (!stability || !data) {
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
