import { useAppStore } from "@/store";
import { IconFont } from "@/components/IconFont";

export const ThemeSwitcher = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const left = { light: 4, system: 32, dark: 60 }[theme];

  return (
    <div className="relative inline-block">
      <div
        className="absolute -z-1 top-1 size-5 rounded-full bg-accent transition-transform shadow"
        style={{
          transform: `translateX(${left}px)`,
        }}
      ></div>
      <div
        className="p-[3px] flex rounded-full border border-gray-300"
        role="radiogroup"
      >
        <button
          className="size-5 mr-2 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("light");
          }}
          aria-label="亮色模式"
        >
          <IconFont name="icon-taiyang" className="text-primary w-4 h-4" />
        </button>
        <button
          className="size-5 mr-2 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("system");
          }}
          aria-label="系统模式"
        >
          <IconFont
            name="icon-gensuixitongzhuti"
            className="text-primary w-4 h-4"
          />
        </button>
        <button
          className="size-5 flex items-center justify-center"
          type="button"
          onClick={() => {
            setTheme("dark");
          }}
          aria-label="暗色模式"
        >
          <IconFont name="icon-yueliang" className="text-primary w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
