import { useAppStore } from "@/store";
import { useEffect } from "react";

export const useInit = () => {
  const [isAutoTheme, setTheme, setIsMobile] = useAppStore((state) => [
    state.isAutoTheme,
    state.setTheme,
    state.setIsMobile,
  ]);

  useEffect(() => {
    const widthMql = window.matchMedia("(max-width: 768px)");
    setIsMobile(widthMql.matches);
    const handleWidthChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    widthMql.addEventListener("change", handleWidthChange);

    return () => {
      widthMql.removeEventListener("change", handleWidthChange);
    };
  }, [setIsMobile]);

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)");
    if (isAutoTheme) {
      setTheme(theme.matches ? "dark" : "light");
    }
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (isAutoTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    theme.addEventListener("change", handleThemeChange);

    return () => {
      theme.removeEventListener("change", handleThemeChange);
    };
  }, [isAutoTheme, setTheme]);
};
