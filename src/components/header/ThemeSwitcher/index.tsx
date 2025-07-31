import { useAppStore } from "@/store";
import { IconFont } from "@/components/IconFont";
import { motion } from "motion/react";

export const ThemeSwitcher = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const left = { light: -2, system: 26, dark: 54 }[theme];

  return (
    <div className="relative mr-14">
      <div
        className="flex h-8 items-center rounded-full border border-gray-300 gap-2 px-2 relative"
        role="radiogroup"
      >
        <motion.div
          className="absolute -z-1 size-6 rounded-full bg-accent/60"
          animate={{ transform: `translateX(${left}px)` }}
          transition={{ type: "spring" }}
        ></motion.div>
        <button
          className="size-5 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("light");
          }}
          aria-label="亮色模式"
        >
          <IconFont name="icon-taiyang" className="text-base w-4 h-4" />
        </button>
        <button
          className="size-5 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("system");
          }}
          aria-label="系统模式"
        >
          <IconFont name="icon-system1" className="text-base w-4 h-4" />
        </button>
        <button
          className="size-5 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("dark");
          }}
          aria-label="暗色模式"
        >
          <IconFont name="icon-yueliang2" className="text-base w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
