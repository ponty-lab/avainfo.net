import React, { memo } from "react";
import styled, { useTheme } from "styled-components";
import { Container, HorizontalBar } from "../../styles/pages.style";
import { toTitleCase } from "../../utils/toTitleCase";
import { TWeather, TWeatherCondition } from "../../models";
import { StyledH2, StyledH3 } from "../../styles/typography.style";
import { WiSnow, WiThermometer, WiWindy } from "react-icons/wi";

type WeatherProps = {
  weather: TWeather[] | undefined;
};

function WeatherIcon({ condition }: { condition: TWeatherCondition }) {
  const theme = useTheme();
  const color = theme.colors.primary;
  const size = 35;

  if (condition === "snow") {
    return <WiSnow size={size} color={color} />;
  } else if (condition === "wind") {
    return <WiWindy size={size} color={color} />;
  } else if (condition === "temp") {
    return <WiThermometer size={size} color={color} />;
  } else {
    return null;
  }
}

const Weather: React.FC<WeatherProps> = ({ weather }) => {
  const conditions: TWeatherCondition[] = ["snow", "wind", "temp"];

  if (!weather) {
    return null;
  }

  return (
    <div>
      <StyledH2>Weather</StyledH2>
      {weather.map((w, index: number) => {
        return (
          <WeatherContainer key={`div_${index}`}>
            <StyledH3>{w.highlight}</StyledH3>
            <p>{w.comment}</p>
            {conditions.map((condition, index: number) => {
              const value = w[condition];
              if (value !== "-") {
                return (
                  <Container key={`conditionscontainer_${index}`}>
                    <IconBar>
                      <WeatherIcon condition={condition} />
                      <IconTitle>{toTitleCase(condition)}</IconTitle>
                    </IconBar>
                    <Paragraph
                      dangerouslySetInnerHTML={{ __html: value }}
                      condition={condition}
                    />
                  </Container>
                );
              }
              return null;
            })}
          </WeatherContainer>
        );
      })}
    </div>
  );
};

const IconBar = styled(HorizontalBar)`
  align-items: center;
  margin-bottom: 12px;
`;

const IconTitle = styled.span`
  margin-left: 10px;
  font-weight: 700;
`;

const Paragraph = styled.p<{ condition: TWeatherCondition }>`
  margin-left: 10px;

  & > ul {
    margin-left: ${(props) => (props.condition === "temp" ? "5px" : "10px")};
    margin-top: 0px;
    margin-bottom: 0px;

    & > li {
      margin-top: 12px;

      &:first-child {
        margin-top: ${(props) => (props.condition === "temp" ? "0px" : "12px")};
      }
    }
  }
`;

const WeatherContainer = styled.div`
  margin-bottom: 12px;
`;

export default memo(Weather);
