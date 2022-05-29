import { css } from "@linaria/core";

export const theme = css`
  :global() {
    html,
    body {
      --backgroundPrimaryColor: #fff;
      --borderPrimaryColor: #ddd;
      --inputPrimaryColor: #fff;
      --fontPrimaryColor: #000;
      --brandColor: #ff006f;

      @media (prefers-color-scheme: dark) {
        --backgroundPrimaryColor: rgb(32, 33, 36);
        --borderPrimaryColor: rgba(255, 255, 255, 0.05);
        --inputPrimaryColor: rgba(255, 255, 255, 0.0125);
        --fontPrimaryColor: #fff;

        background-color: var(--backgroundPrimaryColor);
        color: var(--fontPrimaryColor);
      }

      background-color: var(--backgroundPrimaryColor);
      color: var(--fontPrimaryColor);
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
      width: 300px;
      height: 600px;
    }

    #app-options {
      width: 100vw;
      height: 100vh;
    }
  }
`;
