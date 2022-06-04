import React, { FC, HTMLAttributes, ReactElement } from 'react';
import { styled } from '@linaria/react';
import { IconSearch } from '../icons/IconSearch';

type SearchFieldProps = HTMLAttributes<HTMLInputElement>;

export const SearchField: FC<SearchFieldProps> = ({
  placeholder,
  style,
  className,
  ...props
}): ReactElement => (
  <StyledSearchFieldContainer style={style} className={className}>
    <StyledSearchInput placeholder=" " {...props} />
    <StyledSearchPlaceholder>
      <StyledIconSearch />
      {placeholder}
    </StyledSearchPlaceholder>
  </StyledSearchFieldContainer>
);

const StyledSearchFieldContainer = styled.div`
  position: relative;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: calc(var(--fontBigSize) * 1.5);
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  text-align: center;
  color: var(--textPrimaryColor);
  background-color: var(--controlSecondaryColor);
  border: none;
  outline: none;
  border-radius: 6px;
  box-sizing: border-box;

  &:placeholder-shown ~ div {
    opacity: 1;
  }

  &:focus ~ div {
    opacity: 0;
  }
`;

const StyledSearchPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: calc(var(--fontBigSize) * 1.5);
  font-family: 'Helvetica';
  font-size: var(--fontRegularSize);
  text-align: center;
  color: var(--textSecondaryColor);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
`;

const StyledIconSearch = styled(IconSearch)`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  stroke: var(--textSecondaryColor);
`;
