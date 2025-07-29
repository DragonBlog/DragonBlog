import type { Theme } from "@/store";

const MOURNING_DAYS = ["04-04", "05-12", "07-07", "09-18", "12-13"];

export const applyTheme = (theme: Theme) => {
  const finalTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.setAttribute("data-theme", finalTheme);
};
