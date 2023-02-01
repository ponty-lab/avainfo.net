import React from "react";

type Props = {
  changeState: (i: number) => void;
  property: string;
  options: Record<string, any>;
};

const ToggleButton = (props: Props) => {
  const renderOptions = (option: any, i: number) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeState(i)}
          checked={option.property === props.property}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div
      className="toggle-group"
      style={{ position: "absolute", top: 70, right: 0 }}
    >
      {props.options.map(renderOptions)}
    </div>
  );
};

export default ToggleButton;
