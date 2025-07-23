import clsx from "clsx";

export const IconFont = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <svg
      className={clsx(
        "fill-[currentColor] overflow-hidden [vertical-align:-0.15rem] w-4 h-4",
        className
      )}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
};
