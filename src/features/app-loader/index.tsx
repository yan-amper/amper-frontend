"use client";

import { useState, useEffect } from "react";
import s from "./style.module.css";

export const AppLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={s.appLoader}>
      <div className={s.spinner} />
      <p className={s.loaderText}>Загрузка...</p>
    </div>
  );
};
