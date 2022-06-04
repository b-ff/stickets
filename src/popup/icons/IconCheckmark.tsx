import React, { HTMLAttributes } from 'react';

export const IconCheckmark = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17 1 6 12 1 7" fill="url(#a)" />
    <path
      d="M17 1 6 12 1 7"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <linearGradient
        id="a"
        x1="1"
        y1="6.5"
        x2="17"
        y2="6.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C40046" />
        <stop offset="1" stop-color="#FF512F" />
      </linearGradient>
    </defs>
  </svg>
);
