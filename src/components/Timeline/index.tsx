import React, { useEffect, useRef } from "react";
import { motion, useAnimate, useInView } from "motion/react";
import dayjs from "dayjs";
import { group, sort } from "radash";
import { div } from "motion/react-client";
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
const formatData = (blogs: Blog[]) => {
  const sortBlogs = blogs.map((blog) => {
    const date = dayjs(blog.data.date);
    return {
      ...blog,
      date: date.format("MM/DD/YYYY"),
      year: Number(date.format("YYYY")),
      sortDate: date.unix(),
    };
  });

  const grouped = group(sortBlogs, (blog) => blog.year);

  for (const year in grouped) {
    //非空断言 ！
    grouped[year] = sort(grouped[year]!, (b) => b.sortDate).reverse();
  }

  return grouped;
};

const Timeline = ({ blogs }: TimelineProps) => {
  const groupedBlogs = formatData(blogs);

  //sort 只对数字排序
  const years = sort(Object.keys(groupedBlogs), (year) => Number(year), true);

  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      animate("li", { opacity: 1, y: 0 });
    }
  }, [isInView, animate]);

  return (
    <motion.ul ref={scope}>
      {years.map((year) => (
        <motion.li key={year} className="mb-6">
          <div className="text-lg px-4 mb-2">
            {year}
            <span className="text-sm pl-2">
              ({groupedBlogs[Number(year)]?.length || 0})
            </span>
          </div>
          <ul>
            {groupedBlogs[Number(year)]?.map((blog, index) => (
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
                    <div className="cursor-pointer relative group text-left hover:text-blue-500">
                      {blog.data.title}
                      <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Timeline;
