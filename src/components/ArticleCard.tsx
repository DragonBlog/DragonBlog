import clsx from "clsx";
import dayjs from "dayjs";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

type Props = {
  title?: string;
  date?: Date;
  tags?: string[];
  categories?: string[];
  cover?: string;
  body?: string;
  isRight?: boolean;
};

export const ArticleCard = ({
  title,
  date,
  tags,
  categories,
  cover,
  body,
  isRight,
}: Props) => {
  const formateDate = dayjs(date).format("YYYY-MM-DD");
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll Y Progress: ", latest);
  });
  return (
    <motion.div
      className={clsx(
        "card md:card-side bg-base-100 dark:border-base-content/20 dark:border shadow-lg cursor-pointer",
        {
          "md:flex-row-reverse": isRight,
        }
      )}
      initial={{
        opacity: 0,
        transform: isRight ? "translateX(10%)" : "translateX(-10%)",
      }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{
        amount: 0.3,
        once: true,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
      }}
    >
      <figure
        className={clsx("md:w-1/2", {
          "md:rounded-l-none md:rounded-r-lg": isRight,
        })}
      >
        <img
          src={cover ?? "/pageImage/cover3.jpg"}
          alt={title || "Article cover"}
          className="w-full aspect-video object-contain object-center"
        />
      </figure>
      <div className="card-body md:w-1/2">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <div className="text-base-content/80 line-clamp-3">{body}</div>
        <div className="card-actions justify-between items-end flex-col">
          <div className="text-sm mb-2">{formateDate}</div>
          <div className="flex flex-wrap gap-2 flex-1">
            {categories?.map((item) => {
              return (
                <div key={item} className="badge badge-outline badge-accent">
                  {item}
                </div>
              );
            })}
            {tags?.map((item) => {
              return (
                <div key={item} className="badge badge-outline badge-secondary">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
