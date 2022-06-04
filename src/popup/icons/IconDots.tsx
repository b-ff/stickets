import React, { HTMLAttributes } from 'react';

export const IconDots = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="10" cy="15" r="1" transform="rotate(-180 10 15)" />
    <circle cx="10" cy="10" r="1" transform="rotate(-180 10 10)" />
    <circle cx="10" cy="5" r="1" transform="rotate(-180 10 5)" />
  </svg>
);
