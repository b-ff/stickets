import React, { FC, HTMLAttributes, ReactElement, useCallback } from "react";
import { styled } from "@linaria/react";
import { applyStyleIfHasProperty, noop } from "../../common/utils";

type RadioSwitchProps = {
  options: ISwitchOption[];
  onChange: (value: string) => void;
  name?: string;
  defaultValue?: string;
  disableEmpty?: boolean;
};

type StyledRadioLabelProps = HTMLAttributes<HTMLLabelElement> & {
  active?: boolean;
  disabled?: boolean;
};

export const RadioSwitch: FC<RadioSwitchProps> = ({
  options,
  defaultValue,
  onChange = noop,
  disableEmpty = false,
  name = Date.now().toString(),
}): ReactElement => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value),
    []
  );

  return (
    <StyledRadioSwitchContainer>
      {options.map(({ label, value, count }) => {
        const key = `${name}__${value}`;
        const defaultChecked = defaultValue === value;
        const disabled = disableEmpty && count === 0;
        return (
          <StyledRadioLabel
            htmlFor={key}
            key={key}
            active={defaultChecked}
            disabled={disabled}
          >
            <StyledRadioInput
              type="radio"
              id={key}
              name={name}
              value={value}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
            ></StyledRadioInput>
            {label}
            {typeof count === "number" && (
              <StyledCounter>{count}</StyledCounter>
            )}
          </StyledRadioLabel>
        );
      })}
    </StyledRadioSwitchContainer>
  );
};

const StyledRadioSwitchContainer = styled.fieldset`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0;
  border: 1px solid var(--borderPrimaryColor);

  & > label {
    border-right: 1px solid var(--borderPrimaryColor);
  }

  & > label:last-child {
    border-right: none;
  }
`;

const StyledRadioLabel = styled.label<StyledRadioLabelProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0;
  padding: 10px 5px;
  cursor: pointer;
  opacity: ${applyStyleIfHasProperty("disabled", "0.5", "1")};
  pointer-events: ${applyStyleIfHasProperty("disabled", "none", "initial")};
  background-color: ${applyStyleIfHasProperty(
    "active",
    "var(--borderPrimaryColor)",
    "transparent"
  )};
`;

const StyledCounter = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  margin-left: 5px;
  border-radius: 50%;
  background-color: var(--brandColor);
`;

const StyledRadioInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;
