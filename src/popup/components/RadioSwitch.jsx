import { styled } from "@linaria/react";
import React, { useCallback } from "react";

export function RadioSwitch({
  name = Date.now().toString(),
  options,
  defaultValue,
  onChange,
}) {
  const handleChange = useCallback((event) => onChange(event.target.value), []);

  return (
    <StyledRadioSwitchContainer>
      {options.map(({ label, value, count }) => {
        const key = `${name}__${value}`;
        const defaultChecked = defaultValue === value;
        const disabled = count === 0;
        return (
          <StyledRadioLabel
            for={key}
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
}

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

const StyledRadioLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0;
  padding: 5px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--borderPrimaryColor)" : "transparent"};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "initial")};
`;

const StyledCounter = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  font-size: 11px;
  font-weight: 400;
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
