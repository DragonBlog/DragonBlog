import { menus } from "@/config.json";
import { HeadMenuItem } from "./HeadMenuItem";
import { LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";

type HeadMenuProps = {
  isBgShow: boolean;
};

export function HeadMenu({ isBgShow }: HeadMenuProps) {
  const [{ x, y, radius }, setValue] = useState({
    x: 0,
    y: 0,
    radius: 0,
  });

  const background = `radial-gradient(${radius}px circle at ${x}px ${y}px, var(--color-accent) 0%, transparent 65%)`;

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) => {
    const bounds = currentTarget.getBoundingClientRect();

    setValue({
      x: clientX - bounds.left,
      y: clientY - bounds.top,
      radius: Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5,
    });
  };

  return (
    <motion.nav
      className={clsx(
        "relative rounded-full group pointer-events-auto duration-200",
        {
          "bg-gradient-to-b from-zinc-50/70 to-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10":
            isBgShow,
        }
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <div
        className="absolute -z-1  -inset-px rounded-full opacity-0 group-hover:opacity-10 duration-500"
        style={{ background }}
        aria-hidden
      ></div>
      <LayoutGroup>
        <div className="text-sm px-4 flex">
          {menus.map((menu) => {
            return (
              <HeadMenuItem
                key={menu.name}
                link={menu.link}
                name={menu.name}
                icon={menu.icon}
                children={menu.children}
              />
            );
          })}
        </div>
      </LayoutGroup>
    </motion.nav>
  );
}
