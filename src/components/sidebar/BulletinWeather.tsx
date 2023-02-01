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
        .filter((key) => match.test(key))
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

      outlook.push(forecast);
    }
    setWeather(outlook);
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
            <ul>
              {Object.entries(w).map(([key, value], index) => {
                if (conditions.indexOf(key) !== -1 && value !== "-") {
                  return (
                    <HorizontalBar>
                      <li
                        key={`w_${index}`}
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          flex: 0.1,
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
                          flex: 0.9,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 18,
                            fontWeight: 400,
                            marginBottom: 5,
                          }}
                        >
                          {toTitleCase(key)}
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            marginTop: 0,
                            color: "gray",
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    </HorizontalBar>
                  );
                }
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default memo(BulletinWeather);
