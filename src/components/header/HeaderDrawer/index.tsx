import { Drawer } from "@/components/Drawer";
import { IconFont } from "@/components/IconFont";
import { menus } from "@/config.json";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export const HeaderDrawer = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  return (
    <Drawer
      trigger={
        <motion.div
          className="btn btn-sm btn-circle dark:border-base-content/60"
          layoutId="logo"
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          <IconFont className="cursor-pointer" name="icon-menu" />
        </motion.div>
      }
    >
      <div className="w-2xs h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 w-full px-25">
          {menus.map((menu, index) => (
            <div key={index}>
              <motion.a
                href={menu.link}
                className="flex items-center gap-2 py-1 hover:text-accent transition"
                initial={{ opacity: 0, transform: "translateX(-100px)" }}
                animate={{ opacity: 1, transform: "translateX(0)" }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                onClick={(e) => {
                  if (menu.children) {
                    e.preventDefault();
                    setOpenMenuIndex(openMenuIndex === index ? null : index);
                  }
                }}
              >
                <IconFont name={menu.icon} />
                <span className="ml-1">{menu.name}</span>
              </motion.a>
              <AnimatePresence>
                {menu.children && openMenuIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-6"
                  >
                    {menu.children.map((child, childIndex) => (
                      <motion.a
                        key={childIndex}
                        href={child.link}
                        className="flex items-center gap-2 py-1 hover:text-accent transition"
                        initial={{
                          opacity: 0,
                          transform: "translateX(-100px)",
                        }}
                        animate={{ opacity: 1, transform: "translateX(0)" }}
                        exit={{ opacity: 0, transform: "translateX(-100px)" }}
                        transition={{
                          duration: 0.3,
                          delay: childIndex * 0.05 + 0.1,
                        }}
                      >
                        <IconFont name={child.icon} />
                        <span className="ml-1">{child.name}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
