import React, { HTMLAttributes } from 'react';

export const IconSmile = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.8 11.6S8 13.2 10 13.2s3.2-1.6 3.2-1.6"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.6 7.6h.008M12.4 7.6h.008"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
