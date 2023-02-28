import React, { memo, useEffect, useState } from "react";
import { Container, HorizontalBar, Icon } from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";

type WeatherProps = {
  data: any;
};

const BulletinWeather: React.FC<WeatherProps> = ({ data }) => {
  const conditions = ["snow", "wind", "temp"];

  const icons: Record<string, string> = {
    snow: "fa-regular fa-snowflake",
    wind: "fa-solid fa-wind",
    temp: "fa-solid fa-temperature-half",
  };

  const [weather, setWeather] = useState<Record<string, string>[] | null>(null);

  useEffect(() => {
    let outlook: Record<string, string>[] | null = null;
    if (data) {
      outlook = Object.values(data);
    }
    setWeather(outlook);
  }, [data]);

  if (!weather || !data) {
    return null;
  }

  return (
    <div>
      <h2>Weather</h2>
      {weather.map((w, index: number) => {
        return (
          <div key={`div_${index}`} style={{ marginBottom: 12 }}>
            <h3>{w.highlight}</h3>
            <p>{w.comment}</p>
            {conditions.map((key, index) => {
              const value = w[key];
              if (value !== "-") {
                return (
                  <HorizontalBar key={`conditionsbar_${index}`}>
                    <Icon
                      className={`${icons[key]}`}
                      size="20px"
                      color="theme"
                      marginTop="2px"
                    />
                    <Container>
                      <p>
                        <strong>{toTitleCase(key)}</strong>
                      </p>
                      <p dangerouslySetInnerHTML={{ __html: value }} />
                    </Container>
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
