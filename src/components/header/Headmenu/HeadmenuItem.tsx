import { IconFont } from "@/components/IconFont";
import clsx from "clsx";
import { motion } from "motion/react";

type HeadMenuItemProps = {
  title: string;
  href: string;
  icon: string;
  isActive?: boolean;
};

export const HeadMenuItem = ({
  title,
  href,
  icon,
  isActive,
}: HeadMenuItemProps) => {
  return (
    <a
      href={href}
      className={clsx(
        "relative block px-4 py-1.5",
        isActive ? "text-accent" : "hover:text-accent"
      )}
    >
      <div className="overflow-hidden bg-base-100">
        {isActive && (
          <motion.i
            className="inline-block"
            layoutId="menu-icon"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <IconFont name={icon} />
          </motion.i>
        )}
        <span>{title}</span>
      </div>
      {isActive && (
        <motion.div
          layoutId="menu-bottom"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          transition={{
            type: "spring",
          }}
        ></motion.div>
      )}
    </a>
  );
};
