import { Drawer } from "@/components/Drawer";
import { IconFont } from "@/components/IconFont";
import { menus } from "@/config.json";
import { motion } from "motion/react";

export const HeaderDrawer = () => {
  return (
    <Drawer
      trigger={
        <motion.div
          className="btn btn-sm btn-circle"
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
        <div className="flex flex-col gap-4">
          {menus
            .flatMap((i) => {
              if (i.children) {
                return [i, ...i.children];
              } else {
                return i;
              }
            })
            .map((menu, index) => {
              return (
                <motion.a
                  href={menu.link}
                  className="flex items-center gap-2 hover:text-accent transition"
                  initial={{ opacity: 0, transform: "translateX(-100px)" }}
                  whileInView={{ opacity: 1, transform: "translateX(0)" }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <IconFont name={menu.icon} />
                  <span className="ml-1">{menu.name}</span>
                </motion.a>
              );
            })}
        </div>
      </div>
    </Drawer>
  );
};
