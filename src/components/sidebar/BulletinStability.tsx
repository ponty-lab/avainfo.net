import React, { memo, useEffect, useState } from "react";
import BulletinParagraph from "./BulletinParagraph";
import { SubHeader } from "../../styles/typography.styles";

type Props = {
  properties: any;
};

const BulletinStability: React.FC<Props> = ({ properties }) => {
  const [stability, setStability] = useState<Record<string, string>[] | null>(
    null
  );

  useEffect(() => {
    const stability = [];
    const match = new RegExp("avalancheActivity_");
    const keys = Object.keys(properties).filter(
      (key) => match.test(key) == true
    );

    for (let i = 1; i <= properties.avalancheActivity_count; i++) {
      const match = new RegExp(`avalancheActivity_${i}`);

      const activity = keys
        .filter((key) => match.test(key))
        .reduce((obj, key) => {
          let val;
          if (new RegExp("comment").test(key)) {
            val = { comment: properties[key] };
          } else if (new RegExp("highlight").test(key)) {
            val = { highlight: properties[key] };
          }
          return { ...obj, ...val };
        }, {});

      stability.push(activity);
    }
    setStability(stability);
  }, [properties]);

  if (!stability) {
    return null;
  }

  return (
    <>
      <SubHeader style={styles.text}>Snow Stability</SubHeader>
      {stability.map((activity, index: number) => (
        <div key={`stability ${index}`}>
          {activity.highlight ? (
            <h4 style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
              {activity.highlight}
            </h4>
          ) : null}
          <BulletinParagraph key={`para_${index}`} content={activity.comment} />
        </div>
      ))}
    </>
  );
};

export default memo(BulletinStability);

const styles = {
  text: {
    marginTop: 20,
  },
};
