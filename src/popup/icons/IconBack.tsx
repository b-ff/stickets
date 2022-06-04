import React, { HTMLAttributes } from 'react';

export const IconBack = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path stroke-linecap="round" d="M6 .707.707 6M6 11.293.707 6" />
  </svg>
);
