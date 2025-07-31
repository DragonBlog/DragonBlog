import { useAppStore } from "@/store";
import { useEffect } from "react";
import { applyTheme } from "@/utils/theme";

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
    applyTheme(theme);
    const handler = (event: any) => {
      applyTheme(theme, event.newDocument);
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
      applyTheme("system");
    };

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, [theme]);
};
