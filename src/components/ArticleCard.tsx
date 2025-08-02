import clsx from "clsx";
import dayjs from "dayjs";
import { motion } from "motion/react";
import { IconFont } from "./IconFont";

type Props = {
  title?: string;
  date?: Date;
  tags?: string[];
  categories?: string[];
  cover?: string;
  body?: string;
  isRight?: boolean;
  readingTime?: number;
  words?: number;
};

function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "少于1分钟";
  if (minutes < 60) return `${Math.ceil(minutes)}分钟`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}小时${mins}分钟`;
}

export const ArticleCard = ({
  title,
  date,
  tags,
  categories,
  cover,
  body,
  isRight,
  readingTime,
  words,
}: Props) => {
  const formateDate = dayjs(date).format("YYYY-MM-DD");
  const formateReadingTime = formatReadingTime(
    dayjs(readingTime || 0).minute()
  );

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
        <div className="flex flex-col flex-1 justify-between gap-3">
          <div className="text-base-content/80 line-clamp-3">{body}</div>
          <div className="card-actions">
            <div className="flex flex-wrap gap-2 flex-1">
              <div className="badge badge-sm badge-soft badge-primary">
                <IconFont name="icon-riqi" />
                {formateDate}
              </div>
              <div className="badge badge-sm badge-soft badge-secondary">
                <IconFont name="icon-time" />
                {formateReadingTime}
              </div>
              <div className="badge badge-sm badge-soft badge-accent">
                <IconFont name="icon-words" />
                {words?.toFixed(1)}k字
              </div>
              {categories?.length && (
                <div className="badge badge-sm badge-soft badge-info">
                  <IconFont name="icon-category" />
                  {categories?.join(",")}
                </div>
              )}
              {tags?.length && (
                <div className="badge badge-sm badge-soft badge-success">
                  <IconFont name="icon-biaoqian" />
                  {tags?.join(",")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
