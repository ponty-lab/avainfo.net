import React, { memo } from "react";
import { Container, HorizontalBar, Icon } from "../../styles/sidebar.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { TWeather } from "../../models";

type WeatherProps = {
  weather: TWeather[] | undefined;
};

const BulletinWeather: React.FC<WeatherProps> = ({ weather }) => {
  const conditions = ["snow", "wind", "temp"];

  const icons: Record<string, string> = {
    snow: "fa-regular fa-snowflake",
    wind: "fa-solid fa-wind",
    temp: "fa-solid fa-temperature-half",
  };

  if (!weather) {
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
            {conditions.map((key, index: number) => {
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
