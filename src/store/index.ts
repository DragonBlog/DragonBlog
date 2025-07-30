import type { ExtractState } from "zustand";
import { combine } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createStore } from "zustand/vanilla";

export type Theme = "light" | "dark" | "system";
export const THEME_KEY = "theme";

export const appStore = createStore(
  combine(
    {
      theme: "system" as Theme,
      isMobile: false,
      pathname: "/",
    },
    (set) => ({
      setTheme: (theme: Theme) => {
        localStorage.setItem(THEME_KEY, theme);
        set({ theme });
      },
      setIsMobile: (isMobile: boolean) => set({ isMobile }),
      setPathname: (pathname: string) => set({ pathname }),
    })
  )
);

export type AppStore = ExtractState<typeof appStore>;

export const { getInitialState, getState, subscribe, setState } = appStore;

export function useAppStore(): AppStore;
export function useAppStore<T>(selector: (state: AppStore) => T): T;
export function useAppStore<T>(selector?: (state: AppStore) => T) {
  return useStoreWithEqualityFn(appStore, selector!, shallow);
}
