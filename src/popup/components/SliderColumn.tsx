import { styled } from '@linaria/react';
import React, { FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

type SliderColumnProps = HTMLAttributes<HTMLElement> & {
  slides: ReactNode[];
  currentSlideIndex: number;
};

type StyledSliderColumnRowProps = HTMLAttributes<HTMLElement> & {
  length: number;
  currentSlideIndex: number;
};

export const SliderColumn: FC<SliderColumnProps> = ({
  slides,
  currentSlideIndex,
  ...props
}): ReactElement => (
  <StyledSliderColumnContainer {...props}>
    <StyledSliderColumnRow length={slides.length} currentSlideIndex={currentSlideIndex}>
      {slides.map((slide, idx) => {
        const key = `slide-${idx}`;
        return <StyledSlide key={key}>{slide}</StyledSlide>;
      })}
    </StyledSliderColumnRow>
  </StyledSliderColumnContainer>
);

const StyledSliderColumnContainer = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledSliderColumnRow = styled.section<StyledSliderColumnRowProps>`
  display: flex;
  flex-wrap: nowrap;
  width: calc(100% * ${({ length }) => length || 1});
  height: 100%;
  margin-left: ${({ currentSlideIndex }) => `${0 - currentSlideIndex * 100}%`};
  transition: margin-left 0.1s ease-in-out;
`;

const StyledSlide = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid var(--controlPrimaryColor);

  &:last-of-type {
    border-right: none;
  }
`;
