// components/ThemeSwitcher.tsx
import { useAppStore } from "@/store";
import { IconFont } from "@/components/IconFont";
export function ThemeSwitcher() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const left = { light: 4, system: 32, dark: 60 }[theme];

  return (
    <div className="relative inline-block ">
      <div
        className="absolute -z-1 top-1 size-5 rounded-full  bg-accent  transition-transform shadow"
        style={{
          transform: `translateX(${left}px)`,
        }}
      ></div>
      <div
        className="p-[3px] flex rounded-full border border-gray-300"
        role="radiogroup"
      >
        <button
          className="size-5 mr-2 flex items-center justify-center text-primary"
          type="button"
          aria-label="选择亮色模式"
          onClick={() => setTheme("light")}
        >
          <IconFont name="icon-taiyang" className="text-primary w-4 h-4" />
        </button>
        <button
          className="size-5 mr-2 flex items-center justify-center"
          type="button"
          aria-label="更随系统"
          onClick={() => setTheme("system")}
        >
          <IconFont
            name="icon-gensuixitongzhuti"
            className="text-primary w-4 h-4"
          />
        </button>
        <button
          className="size-5 flex items-center justify-center"
          type="button"
          aria-label="选择暗色模式"
          onClick={() => setTheme("dark")}
        >
          <IconFont name="icon-yueliang" className="text-primary w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
