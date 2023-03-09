import styled from "styled-components";

type Props = {
  // eslint-disable-next-line no-unused-vars
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

const ToggleContainer = styled.label`
  max-width: 100%;

  > input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
`;

const Toggle = styled.div`
  flex-shrink: 0;
  cursor: pointer;
  color: #757d82;
  font-size: 12px;
  line-height: 18px;
  padding: 3px 18px;
  border-radius: 15px;
  /* fully round by default */
  background-color: transparent;
  transition: color 0.125s, background-color 0.125s;
  padding-top: 3px !important;
  padding-bottom: 3px !important;

  input:checked + &--active-white {
    color: ${(props) => props.theme.colors.background};
  }

  input:checked + & {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
  }
`;

const ToggleGroup = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  display: inline-flex;
  text-align: center;
  border-radius: 18px;
  margin-right: 30px !important;
  margin-top: 12px !important;
  border-style: solid;
  border-width: 1px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.background};
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
`;

export default ToggleButton;
