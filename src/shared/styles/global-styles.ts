"use client";

import { createGlobalStyle } from "styled-components";
import { tokens } from "./tokens";

export const GlobalStyles = createGlobalStyle`
  ${tokens}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    /* dvh, а не vh: на мобильных браузерах 100vh включает адресную строку
       и страница получает лишний скролл */
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--surface);
    color: var(--text-primary);
  }

  /* Шапка — position: fixed и из потока выпадает, поэтому отступ под неё
     задаётся здесь один раз, а не магическим margin-top в каждой странице.
     Высота живёт в токене --header-h. */
  body > main {
    padding-top: var(--header-h);
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

  /* Якорная навигация (кнопка «Наши адреса» → /#address) со смещением
     на высоту фиксированной шапки — иначе заголовок секции уезжает под неё. */
  [id] {
    scroll-margin-top: calc(var(--header-h) + 1rem);
  }

  /* line-height: 1.6 задан на body для основного текста, но для заголовков
     он даёт слишком разреженные строки (у h2 в 1.875rem — строка 48px). */
  h1, h2, h3, h4 {
    line-height: 1.2;
    text-wrap: balance;
  }

  button {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Единое кольцо фокуса на весь сайт. Раньше :focus был описан только
     у пяти инпутов, а кнопки, ссылки и пагинация не показывали фокус
     вообще — с клавиатуры было невозможно понять, где ты находишься.
     :focus-visible, а не :focus — мышью кольцо не появляется. */
  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: var(--color-brand);
    position: fixed;
    z-index: 1100;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px var(--color-brand), 0 0 5px var(--color-brand);
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
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
