import { useAppStore } from "@/store";
import { useEffect } from "react";
import dayjs from "dayjs";
import type { Theme } from "@/store";
const MOURNING_DAYS = ["04-04", "05-12", "07-07", "09-18", "12-13"];
const localStorageKey = "ThemeStore";

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

    return () => {
      widthMql.removeEventListener("change", handleWidthChange);
    };
  }, [setIsMobile]);

  // useEffect(() => {
  //   const local = localStorage.getItem(localStorageKey);
  //   if (local) {
  //     setTheme(local as Theme);
  //   } else {
  //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light";
  //     setTheme(systemTheme);
  //   }
  // }, [setTheme]);

  useEffect(() => {
    const today = dayjs();
    console.log(today.format("MM-DD"));
    if (MOURNING_DAYS.includes(today.format("MM-DD"))) {
      document.documentElement.classList.add("gray");
    } else {
      document.documentElement.classList.remove("gray");
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);
};
