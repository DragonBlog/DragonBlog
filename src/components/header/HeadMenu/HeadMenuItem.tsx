import { IconFont } from "@/components/IconFont";
import { useAppStore } from "@/store";
import { useDebounceFn } from "ahooks";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

type HeadMenuItemProps = {
  name: string;
  link: string;
  icon: string;
  children?: {
    name: string;
    link: string;
    icon: string;
  }[];
};

export const HeadMenuItem = ({
  name,
  link,
  icon,
  children,
}: HeadMenuItemProps) => {
  const pathName = useAppStore((store) => store.pathname);

  const { isActive, childPath } = useMemo(() => {
    let childPath: undefined | string = pathName.replace(link, "");

    const isActive =
      link === pathName ||
      (children && children.some((child) => child.link === childPath));

    if (!isActive) {
      childPath = undefined;
    }

    return { isActive, childPath };
  }, [pathName]);

  const current = useMemo(() => {
    if (childPath && children) {
      return children.find((item) => item.link === childPath) || { name, icon };
    }
    return { name, icon };
  }, [name, icon, childPath, children]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { run } = useDebounceFn(setIsDropdownOpen, {
    wait: 300,
  });

  return (
    <a
      href={link}
      className={clsx(
        "relative block px-4 py-1.5 group",
        isActive ? "text-accent" : "hover:text-accent"
      )}
      onMouseEnter={() => {
        setIsDropdownOpen(true);
      }}
      onMouseLeave={() => {
        run(false);
      }}
    >
      <div>
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
            <IconFont name={current.icon} />
          </motion.i>
        )}
        <span className="ml-1">{current.name}</span>
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

      <AnimatePresence>
        {isDropdownOpen && children && (
          <motion.div
            className="absolute w-30 translate-x-[-50%] left-[50%] opacity-0"
            initial={{
              top: 60,
            }}
            animate={{
              opacity: 1,
              top: 40,
            }}
            exit={{ opacity: 0, top: 60 }}
            onMouseEnter={() => run(true)}
            onMouseLeave={() => run(false)}
          >
            <ul className="relative shadow bg-base-100/90 rounded-lg overflow-hidden">
              {children.map((child) => (
                <li
                  key={child.link}
                  className="flex justify-center items-center w-full p-1 py-2 text-base-content hover:text-accent hover:bg-accent/10 transition"
                >
                  <a
                    href={`${link}${child.link}`}
                    className="flex items-center gap-2"
                  >
                    <IconFont name={child.icon} />
                    <span>{child.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};
