import React, { memo } from "react";
import { Container, HorizontalBar, Icon } from "../../styles/pages.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { TWeather } from "../../models";
import { StyledH2, StyledH3 } from "../../styles/typography.style";

type WeatherProps = {
  weather: TWeather[] | undefined;
};

const Weather: React.FC<WeatherProps> = ({ weather }) => {
  const conditions: (keyof TWeather)[] = ["snow", "wind", "temp"];

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
      <StyledH2>Weather</StyledH2>
      {weather.map((w, index: number) => {
        return (
          <div key={`div_${index}`} style={{ marginBottom: 12 }}>
            <StyledH3>{w.highlight}</StyledH3>
            <p>{w.comment}</p>
            {conditions.map((key, index: number) => {
              const value = w[key];
              if (value !== "-") {
                return (
                  <Container key={`conditionscontainer_${index}`}>
                    <HorizontalBar key={`conditionsbar_${index}`}>
                      <Icon
                        className={`${icons[key]}`}
                        size="20px"
                        color="theme"
                        marginTop="2px"
                      />
                      <p>
                        <strong>{toTitleCase(key)}</strong>
                      </p>
                    </HorizontalBar>
                    <p
                      style={{ marginLeft: 15 }}
                      dangerouslySetInnerHTML={{ __html: value }}
                    />
                  </Container>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Weather);
