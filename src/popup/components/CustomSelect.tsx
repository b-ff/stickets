import { styled } from '@linaria/react';
import React from 'react';
import Select, { Props, DropdownIndicatorProps, components } from 'react-select';
import { IconChevronDown } from '../icons/IconChevronDown';

export const CustomSelect = ({ components, ...props }: Props) => (
  <StyledSelect
    components={{
      ...components,
      Control,
      IndicatorSeparator,
      DropdownIndicator,
      ValueContainer,
      Placeholder,
      SingleValue,
      Input,
      Menu,
      MenuList,
      Option,
    }}
    classNamePrefix="stickets-select"
    {...props}
  />
);

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <StyledDropdownIndicator {...props}>
    <IconChevronDown />
  </StyledDropdownIndicator>
);

const textStyle = `
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  color: var(--textPrimaryColor);
  line-height: 20px;
`;

const StyledSelect = styled(Select)`
  position: relative;
  z-index: 3;
`;

const Control = styled(components.Control)`
  &.stickets-select__control {
    min-height: 20px;
    background-color: var(--backgroundPrimaryColor);
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
  }
`;

const IndicatorSeparator = styled(components.IndicatorSeparator)`
  &.stickets-select__indicator-separator {
    display: none;
  }
`;

const StyledDropdownIndicator = styled(components.DropdownIndicator)`
  &.stickets-select__indicator {
    padding: 0 var(--fontBigSize) 0 calc(var(--fontBigSize) / 2);

    & svg {
      width: 8px;
      height: 5px;
      stroke: var(--iconPrimaryColor);
    }
  }
`;

const ValueContainer = styled(components.ValueContainer)`
  &.stickets-select__value-container {
    padding: 0 0 0 var(--fontBigSize);
    ${textStyle}
  }

  & .stickets-select__input-container {
    margin: 0;
  }
`;

const Placeholder = styled(components.Placeholder)`
  &.stickets-select__placeholder {
    margin: 0;
    ${textStyle}
    color: var(--textTertiaryColor);
  }
`;

const SingleValue = styled(components.SingleValue)`
  &.stickets-select__single-value {
    margin: 0;
    ${textStyle}
  }
`;

const Input = styled(components.Input)`
  &.stickets-select__input {
    margin: 0;
    ${textStyle}
  }
`;

const Menu = styled(components.Menu)`
  &.stickets-select__menu {
    min-width: 250px;
    background-color: var(--backgroundPrimaryColor);
    margin: calc(var(--fontBigSize) / 4) 0;
    border-radius: 6px;
    overflow: auto;
    z-index: 3;
  }
`;

const MenuList = styled(components.MenuList)`
  &.stickets-select__menu-list {
    padding: 0;
  }
`;

const Option = styled(components.Option)`
  &.stickets-select__option {
    position: relative;
    padding: calc(var(--fontBigSize) / 2) var(--fontSmallSize);
    ${textStyle}
    cursor: pointer;
  }

  &.stickets-select__option::before {
    position: absolute;
    content: ' ';
    display: block;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - var(--fontSmallSize) * 2);
    height: 1px;
    background-color: var(--controlPrimaryColor);
  }

  &.stickets-select__option:last-of-type::before {
    display: none;
  }

  &.stickets-select__option--is-selected {
    background-color: var(--controlSecondaryColor);
    cursor: default;
  }

  &.stickets-select__option--is-focused {
    background-color: var(--controlSecondaryColor);
  }
`;
