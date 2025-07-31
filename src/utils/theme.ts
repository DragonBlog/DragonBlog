import type { Theme } from "@/store";
import dayjs from "dayjs";
const MOURNING_DAYS = ["04-04", "05-12", "07-07", "09-18", "12-13"];

export function applyTheme(theme: Theme, newDocument: Document = document) {
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

export const isGary = () => {
  const today = dayjs().format("MM-DD");
  return MOURNING_DAYS.includes(today);
};
