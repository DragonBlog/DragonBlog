import { useAppStore } from "@/store";
import { IconFont } from "../IconFont";

export const Header = () => {
  const { isMobile } = useAppStore();

  return (
    <div>
      <IconFont name="circleyuanquan" className="text-primary w-10 h-10" />
      <IconFont name="archive" />
      <IconFont name="uniFE" />
      <IconFont name="tags" />
    </div>
  );
};
