import { useAppStore, THEME_KEY } from "@/store";
import { useEffect } from "react";
import {
  getLocalTheme,
  getSystemTheme,
  changePageTheme,
  isGary,
} from "@/utils/theme";

import type { Theme } from "@/store";
import { th } from "motion/react-client";

export function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const finalTheme =
    theme === "system" ? (prefersDark ? "dark" : "light") : theme;
  document.documentElement.setAttribute("data-theme", finalTheme);
}
export const useInit = () => {
  const [setIsMobile, setTheme, theme] = useAppStore((state) => [
    state.setIsMobile,
    state.setTheme,
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
    const local = getLocalTheme();
    const system = getSystemTheme();
    if (local === "system") {
      changePageTheme(system);
    } else {
      changePageTheme(local);
    }
    if (isGary()) {
      document.documentElement.classList.add("gray");
    }
    console.log("zhixingl ");
  }, [theme, setTheme]);
};
