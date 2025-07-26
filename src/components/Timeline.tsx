import React, { useEffect, useRef } from "react";
import { motion, useAnimate, useInView } from "motion/react";

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
  const Blogs = [...blogs].sort((a, b) => {
    if (!a.data.date) return 1;
    if (!b.data.date) return -1;
    return b.data.date.getTime() - a.data.date.getTime();
  });

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
      {Blogs.map((blog, index) => (
        <motion.li
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          className="text-sm px-4 py-2"
        >
          <div className="flex items-center w-1/2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>

            <div className="flex-1 flex justify-start">
              <div className="cursor-pointer relative group text-left">
                {blog.data.title}
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
            <div className="pl-6 min-w-max"> {formatDate(blog.data.date)}</div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Timeline;
