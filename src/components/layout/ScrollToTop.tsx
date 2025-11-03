"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // 禁用浏览器的滚动恢复，防止刷新后恢复滚动位置
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (previousPathname.current !== pathname) {
      window.scrollTo(0, 0);
      previousPathname.current = pathname;
      // 延迟执行，确保在浏览器可能的滚动恢复之后
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return null;
}
