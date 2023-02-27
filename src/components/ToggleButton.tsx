import React from "react";
import { Toggle, ToggleContainer, ToggleGroup } from "../styles/map.style";

type Props = {
  changeState: (i: number) => void;
  property: string;
  options: Record<string, any>;
};

const ToggleButton = (props: Props) => {
  const renderOptions = (option: any, i: number) => {
    return (
      <ToggleContainer key={i}>
        <input
          onChange={() => props.changeState(i)}
          checked={option.property === props.property}
          name="toggle"
          type="radio"
        />
        <Toggle>{option.name}</Toggle>
      </ToggleContainer>
    );
  };
  return <ToggleGroup>{props.options.map(renderOptions)}</ToggleGroup>;
};

export default ToggleButton;
