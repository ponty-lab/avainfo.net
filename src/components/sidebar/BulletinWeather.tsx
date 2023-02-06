import React, { memo, useEffect, useState } from "react";

import BulletinParagraph from "./BulletinParagraph";
import { Caption } from "../../styles/typography.styles";
import { HorizontalBar } from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";

type WeatherProps = {
  properties: any;
};

const BulletinWeather: React.FC<WeatherProps> = ({ properties }) => {
  const conditions = ["snow", "wind", "temp"];
  const count = 2;

  const icons: Record<string, string> = {
    snow: "fa-regular fa-snowflake",
    wind: "fa-solid fa-wind",
    temp: "fa-solid fa-temperature-half",
  };

  const [weather, setWeather] = useState<Record<string, string>[] | null>(null);

  useEffect(() => {
    const outlook: Record<string, string>[] = [];
    const match = new RegExp("weather_");
    const keys = Object.keys(properties).filter(
      (key) => match.test(key) == true
    );

    for (let i = 1; i <= count; i++) {
      const match = new RegExp(`weather_${i}`);

      const forecast = keys
        .filter((key) => match.test(key) === true)
        .reduce((obj, key) => {
          let val;
          if (new RegExp("highlight").test(key)) {
            val = { highlight: properties[key] };
          } else if (new RegExp("comment").test(key)) {
            val = { comment: properties[key] };
          } else if (new RegExp("snow").test(key)) {
            val = { snow: properties[key] };
          } else if (new RegExp("wind").test(key)) {
            val = { wind: properties[key] };
          } else if (new RegExp("temp").test(key)) {
            val = { temp: properties[key] };
          }
          return { ...obj, ...val };
        }, {});

      if (Object.keys(forecast).length) {
        outlook.push(forecast);
      }
    }

    if (outlook.length) {
      setWeather(outlook);
    }
  }, [properties]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      {weather.map((w, index: number) => {
        return (
          <div key={`weather_${index}`}>
            <BulletinParagraph title={w.highlight} content={w.comment} />
            {conditions.map((key) => {
              const value = w[key];
              if (value !== "-") {
                return (
                  <HorizontalBar>
                    <li
                      key={`w_${index}`}
                      style={{
                        display: "flex",
                        //alignSelf: "center",
                        //marginRight: 20,
                        marginBlockStart: 0,
                        minWidth: 48,
                      }}
                    >
                      <i
                        className={`${icons[key]}`}
                        style={{ fontSize: 28, color: "#286882" }}
                      ></i>
                    </li>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 400,
                          marginBottom: 5,
                        }}
                      >
                        {toTitleCase(key)}
                      </span>
                      <p
                        style={{
                          fontSize: 14,
                          marginTop: 0,
                          color: "gray",
                        }}
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    </div>
                  </HorizontalBar>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(BulletinWeather);
