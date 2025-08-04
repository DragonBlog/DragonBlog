import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export const Drawer = (props: {
  trigger?: React.ReactNode;
  container: (close: () => void) => React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{props.trigger}</div>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bg-base-content/50 dark:bg-neutral/50 z-10 top-0 left-0 w-screen h-screen overflow-hidden flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              onScroll={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <motion.div
                className="bg-base-100 rounded-tr-lg rounded-br-lg h-full"
                initial={{
                  x: -200,
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: -200,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {props.container(() => {
                  setIsOpen(false);
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector("#drawer")!
      )}
    </>
  );
};
