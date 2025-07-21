import React, { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";

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
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      animate("li", { opacity: 1, y: 0 });
    }
  }, [isInView]);

  return (
    <motion.ul ref={scope}>
      {blogs.map((blog, index) => (
        <motion.li
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          className="text-red-500 text-xl  px-4 py-2  "
        >
          {blog.data.title} ----------- {formatDate(blog.data.date)}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Timeline;
