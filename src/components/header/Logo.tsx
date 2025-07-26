import { author } from "@/config.json";
import { motion } from "motion/react";

export function Logo() {
  return (
    <motion.a
      initial={{
        transform: "translateY(-30px)",
      }}
      animate={{
        transform: "translateY(0px)",
      }}
      className="block"
      href="/"
      title="Nav to home"
    >
      <img
        className="size-[40px] select-none object-cover rounded-2xl"
        src={author.avatar}
        alt="Site owner avatar"
      />
    </motion.a>
  );
}
