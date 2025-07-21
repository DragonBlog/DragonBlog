import React, { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

type Blog = {
  id: string;
  body?: string;
  collection: "blogs";
  data: {
    date?: Date;
    title?: string;
    tags?: string[];
    categories?: string[];
  };
  rendered?: any;
  filePath?: string;
};

interface TimelineProps {
  blogs: Blog[];
}

const formatDate = (date: Date | undefined) => {
  if (!date) return "No date available";

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const Timeline = ({ blogs }: TimelineProps) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, transition: { staggerChildren: 0.1 } });
    }
  }, [isInView, controls]);

  return (
    <motion.ul
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className="space-y-4"
    >
      {blogs.map((blog, index) => (
        <motion.li
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-red-500 text-2xl"
        >
          {blog.data.title} ----------- {formatDate(blog.data.date)}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Timeline;
