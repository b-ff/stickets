import React, { HTMLAttributes } from 'react';

export const IconLogo = (props: HTMLAttributes<SVGElement>) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M0 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
      fill="#000"
    />
    <mask
      id="a"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="4"
      y="3"
      width="12"
      height="14"
    >
      <path
        d="M11.707 7.453c-.036-.444-.203-.79-.5-1.04-.294-.249-.74-.373-1.34-.373-.383 0-.696.047-.94.14-.24.089-.418.211-.534.367a.906.906 0 0 0-.18.533.876.876 0 0 0 .087.447c.071.129.182.246.333.353.151.102.345.196.58.28.236.084.516.16.84.227l1.12.24c.756.16 1.403.37 1.94.633.538.262.978.571 1.32.927.343.35.594.746.754 1.186.164.44.249.92.253 1.44-.004.898-.229 1.658-.673 2.28-.445.623-1.08 1.096-1.907 1.42-.822.325-1.811.487-2.967.487-1.186 0-2.222-.176-3.106-.527-.88-.35-1.565-.89-2.054-1.62-.484-.733-.729-1.67-.733-2.813h3.52c.022.418.127.769.313 1.053.187.285.45.5.787.647.342.147.749.22 1.22.22.396 0 .727-.049.993-.147.267-.097.47-.233.607-.406a.96.96 0 0 0 .213-.594.842.842 0 0 0-.206-.546c-.13-.16-.343-.303-.64-.427-.298-.129-.7-.249-1.207-.36l-1.36-.293c-1.209-.263-2.162-.7-2.86-1.314-.693-.617-1.038-1.46-1.033-2.526-.005-.867.226-1.625.693-2.274.471-.653 1.122-1.162 1.953-1.526C7.83 3.182 8.787 3 9.867 3c1.102 0 2.055.184 2.86.553.804.37 1.424.89 1.86 1.56.44.667.662 1.447.666 2.34h-3.546Z"
        fill="#000"
      />
    </mask>
    <g mask="url(#a)">
      <circle cx="7.878" cy="7.36" r="3.849" fill="url(#b)" />
      <circle cx="15.388" cy="1.54" r="5.726" fill="url(#c)" />
      <circle
        cx="13.801"
        cy="12.344"
        r="4.403"
        transform="rotate(59.914 13.8 12.344)"
        fill="url(#d)"
      />
      <circle
        cx="7.481"
        cy="12.971"
        r="3.604"
        transform="rotate(-114.22 7.481 12.97)"
        fill="url(#e)"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1="4.029"
        y1="7.36"
        x2="11.726"
        y2="7.36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C40046" />
        <stop offset="1" stopColor="#FF512F" />
      </linearGradient>
      <linearGradient
        id="c"
        x1="20.177"
        y1="-1.23"
        x2="13.893"
        y2="-4.279"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#516302" />
        <stop offset="1" stopColor="#D5E803" />
      </linearGradient>
      <linearGradient
        id="d"
        x1="9.398"
        y1="12.344"
        x2="18.203"
        y2="12.344"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C40046" />
        <stop offset="1" stopColor="#FF512F" />
      </linearGradient>
      <linearGradient
        id="e"
        x1="3.877"
        y1="12.971"
        x2="11.086"
        y2="12.971"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C40046" />
        <stop offset="1" stopColor="#FF512F" />
      </linearGradient>
    </defs>
  </svg>
);
