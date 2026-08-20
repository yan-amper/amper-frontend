"use client";

import { useEffect } from "react";

export const useHideScroll = (hide: boolean) => {
  useEffect(() => {
    if (!hide) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.removeProperty("--scrollbar-width");
    };
  }, [hide]);
};
