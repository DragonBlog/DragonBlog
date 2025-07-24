import type { ExtractState } from "zustand";
import { combine } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createStore } from "zustand/vanilla";

export const appStore = createStore(
  combine(
    {
      theme: "light",
      isMobile: false,
      isAutoTheme: true,
      pathname: "/",
    },
    (set) => ({
      setTheme: (theme: string) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setIsMobile: (isMobile: boolean) => set({ isMobile }),
      setIsAutoTheme: (isAutoTheme: boolean) => set({ isAutoTheme }),
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
