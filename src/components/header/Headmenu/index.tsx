import { menus } from "@/config.json";
import { HeadMenuItem } from "./HeadMenuItem";
import { useAppStore } from "@/store";
import { AnimatePresence, LayoutGroup } from "motion/react";

type HeadMenuProps = {
  isBgShow: boolean;
};

export function HeadMenu({ isBgShow }: HeadMenuProps) {
  const [pathName] = useAppStore((store) => [store.pathname]);
  return (
    <LayoutGroup>
      <div className="text-sm px-4 flex">
        {menus.map((menu) => (
          <HeadMenuItem
            key={menu.name}
            href={menu.link}
            title={menu.name}
            icon={menu.icon}
            isActive={pathName === menu.link}
          />
        ))}
      </div>
    </LayoutGroup>
  );
}
