import React, { HTMLAttributes } from 'react';

export const IconClose = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10 16.667a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334ZM12 8l-4 4M8 8l4 4"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
