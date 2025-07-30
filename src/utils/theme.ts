import type { Theme } from "@/store";
import { THEME_KEY } from "@/store";
import dayjs from "dayjs";
const MOURNING_DAYS = ["04-04", "05-12", "07-07", "09-18", "12-13"];

export function applyTheme(theme: Theme) {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const finalTheme = theme === "system" ? systemTheme : theme;

  document.documentElement.setAttribute("data-theme", finalTheme);
}
export function getLocalTheme() {
  const local = localStorage.getItem(THEME_KEY);
  if (local === "dark" || local === "light") {
    return local;
  } else {
    setLocalTheme("system");
    return "system";
  }
}
export const isGary = () => {
  const today = dayjs().format("MM-DD");
  return MOURNING_DAYS.includes(today);
};
export function changePageTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setLocalTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
}
