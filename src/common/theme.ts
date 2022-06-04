import { css } from '@linaria/core';
import { getCSSVariablesDefinitionFromTheme } from './utils';

export const theme: IThemeObject = {
  light: {
    backgroundPrimaryColor: '#ffffff',
    textPrimaryColor: '#202124',
    textSecondaryColor: '#61646d',
    textTertiaryColor: '#a9b3bb',
    controlPrimaryColor: '#dbe2e8',
    controlSecondaryColor: '#f4f6f6',
    buttonPrimaryColor: '#c30046',
    buttonSecondaryColor: '#ff512f',
    iconPrimaryColor: '#ea115f',
  },
  dark: {
    backgroundPrimaryColor: '#202124',
    textPrimaryColor: '#ffffff',
    textSecondaryColor: '#a9b3bb',
    textTertiaryColor: '#61646d',
    controlPrimaryColor: '#3a3d44',
    controlSecondaryColor: '#303135',
    buttonPrimaryColor: '#c30046',
    buttonSecondaryColor: '#ff512f',
    iconPrimaryColor: '#ea115f',
  },
};

const lightCSSVariables = getCSSVariablesDefinitionFromTheme(theme.light);
const darkCSSVariables = getCSSVariablesDefinitionFromTheme(theme.dark);

export const themeStyles = css`
  :global() {
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    figure {
      margin: 0;
      padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-weight: 600;
    }

    a {
      color: var(--textPrimaryColor);
    }

    html,
    body {
      ${lightCSSVariables}

      --fontBigSize: 16px;
      --fontRegularSize: 14px;
      --fontSmallSize: 12px;

      background-color: var(--backgroundPrimaryColor);
      color: var(--textPrimaryColor);
      font-family: 'Helvetica';
      font-size: 14px;
      font-weight: normal;

      @media (prefers-color-scheme: dark) {
        ${darkCSSVariables}

        background-color: var(--backgroundPrimaryColor);
        color: var(--textPrimaryColor);
      }
    }

    html,
    body,
    #app-popup,
    #app-options {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    #app-popup {
      width: 800px;
      height: 600px;
    }

    #app-options {
      width: 100vw;
      height: 100vh;
    }
  }
`;
