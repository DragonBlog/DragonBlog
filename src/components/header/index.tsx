import { useAppStore } from "@/store";
import { HeadMenu } from "./HeadMenu";
import { Logo } from "./Logo";
import { HeaderDrawer } from "./HeaderDrawer";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AnimatePresence, LayoutGroup } from "motion/react";

export const Header = () => {
  const { isMobile } = useAppStore();

  return (
    <header className="h-[64px] fixed top-0 w-full border-b border-base-300">
      <div className="absolute opacity-90 inset-0 -z-1 backdrop-blur-md"></div>
      <AnimatePresence>
        <div className="max-w-5xl h-full mx-auto grid grid-cols-[64px_auto_64px] md:px-4">
          <div className="flex justify-center items-center">
            {isMobile ? <HeaderDrawer /> : <Logo />}
          </div>
          <div className="flex justify-center items-center">
            {isMobile ? <Logo /> : <HeadMenu isBgShow />}
          </div>

          <div className="flex justify-center items-center">
            <ThemeSwitcher />
            search
          </div>
        </div>
      </AnimatePresence>
    </header>
  );
};
