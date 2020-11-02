import { createGlobalStyle } from 'styled-components';
import { generateMedia } from 'styled-media-query';
import { normalize } from 'styled-normalize';

import { localTheme } from './localTheme';

export const LargeDesktop = 1700;
export const MacBook13 = 1441;
export const Desktop = 1172;
export const Laptop = 1172;
export const LargeTablet = 960;
export const Tablet = 768;
export const Mobile = 760;
export const MobileMax = 414;
export const MobileSecondaryAndroid = 400;
export const smallMobile = 360;

export const customMedia = generateMedia({
  largeDesktop: '1700px',
  macBook13: '1441px',
  desktop: '1296px',
  laptop: '1172px',
  largeTablet: '960px',
  tablet: '768px',
  mobile: '760px',
  mobileMax: '414px',
  mobileSecondaryAndroid: '400px',
  mobileSecondary: '375px',
  smallMobile: '360px',
});

export const GlobalStyle = createGlobalStyle`
  ${normalize}

body,
h1,h2,h3,h4,h5,p,span,a {
  font-family: Inter, sans-serif;
}

  * {
    box-sizing: border-box;
  }
  *:focus {
    outline: none;
  }

  html {
    /* Memo: Make root font size to 10px */
    font-size: 62.5% !important;
    height: 100%;
  }

  /* Memo: Root id for Next.js */
  #__next{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  /* Memo: To make footer attached to the bottom  */
  .Footer-pusher {
    flex: 1;
  }

  body {
    color: ${localTheme.colors.greyBlack};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-size: auto;
    position: relative;
    padding: 0;
    margin: 0;
    height: 100%;
  }


  /* Memo: Common styles */
  .Ui-library {
    font-size: 100% !important;
  }
  .Link-style {
    text-decoration: none;
    font-weight: bold;
    color: ${localTheme.colors.blue};
    border-bottom: 0.1rem solid ${localTheme.colors.blue};
  }

  .Align-self-center {
    align-self: center;
  }
  .Center{
    text-align: center;
  }

  .Scale{
    transition: all 0.3s ease 0s;
    :hover{
      transition: all 0.3s ease 0s;
      transform: scale(1.05);
    }
  }

  .Pointer {
    cursor: pointer;
  }
  .Not-allowed {
    cursor: not-allowed !important;
    opacity: 0.3;
  }
  .Transparent {
    color: ${localTheme.colors.transparent}
  }
  .Bold {
    font-weight: bold;
  }
  .Half-opacity {
    opacity: 0.5;
  }

`;
