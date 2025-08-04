import { useAppStore } from "@/store";
import { useEffect } from "react";
import type { Theme } from "@/store";
import type { TransitionBeforeSwapEvent } from "astro:transitions/client";
import { isGary } from "@/utils/theme";
export function init(theme: Theme, e?: TransitionBeforeSwapEvent) {
  const newDocument = e?.newDocument || document;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const finalTheme = theme === "system" ? systemTheme : theme;
  if (isGary()) {
    newDocument.documentElement.classList.add("gray");
  }
  newDocument.documentElement.setAttribute(
    "data-theme",
    finalTheme === "dark" ? "night" : "light"
  );
}
export const useInit = () => {
  const [setIsMobile, theme] = useAppStore((state) => [
    state.setIsMobile,
    state.theme,
  ]);

  useEffect(() => {
    const widthMql = window.matchMedia("(max-width: 768px)");
    setIsMobile(widthMql.matches);
    const handleWidthChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    widthMql.addEventListener("change", handleWidthChange);
    return () => widthMql.removeEventListener("change", handleWidthChange);
  }, [setIsMobile]);

  useEffect(() => {
    init(theme);
    const handler = (event: TransitionBeforeSwapEvent) => {
      init(theme, event);
    };
    document.addEventListener("astro:before-swap", handler);

    return () => {
      document.removeEventListener("astro:before-swap", handler);
    };
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      init("system");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);
};
