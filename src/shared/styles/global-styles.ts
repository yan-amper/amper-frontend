"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Lets short pages (like 404) stretch to fill the viewport instead of
     leaving a gap above the footer on tall screens; pages with content
     taller than the viewport are unaffected (min-height:auto default).
     main is itself a column flex container so a page's root element can
     opt in with flex:1 and reliably fill the remaining height — percentage
     heights (height:100%) through a flex-grown ancestor aren't dependable
     across browsers, flex-grow on a direct child is. */
  body > main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #dc2626;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
