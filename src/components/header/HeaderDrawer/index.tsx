import { Drawer } from "@/components/Drawer";
import { IconFont } from "@/components/IconFont";
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
      <div className="w-2xs">dddd</div>
    </Drawer>
  );
};
