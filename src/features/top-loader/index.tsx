"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";

const paramsWithoutProduct = (params: URLSearchParams) => {
  const copy = new URLSearchParams(params.toString());
  copy.delete("product");
  return copy.toString();
};

export const TopLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevRef = useRef<{ pathname: string; params: string } | null>(null);

  useEffect(() => {
    const params = paramsWithoutProduct(searchParams);
    const prev = prevRef.current;

    const isProductOnlyChange =
      prev !== null && prev.pathname === pathname && prev.params === params;

    prevRef.current = { pathname, params };

    if (isProductOnlyChange) return;

    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
};
