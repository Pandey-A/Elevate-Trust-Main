import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollToTop() {
  const scrollingElement = document.scrollingElement ?? document.documentElement;

  scrollingElement.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);

  // Extra pass after paint, images/layout can reflow right after navigation
  requestAnimationFrame(() => {
    scrollingElement.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  });
}

/** Scrolls to top on every route change so footer/nav links feel like a real page change. */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const timer = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          scrollToTop();
        }
      }, 80);
      return () => window.clearTimeout(timer);
    }

    scrollToTop();
    const timer = window.setTimeout(scrollToTop, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, search, hash]);

  return null;
}
