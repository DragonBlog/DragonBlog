import { useAppStore } from "@/store";
import { IconFont } from "../IconFont";

export const Header = () => {
  const { isMobile } = useAppStore();

  return (
    <div>
      <IconFont name="icon-circleyuanquan" className="text-primary w-10 h-10" />
      <IconFont name="icon-archive" />
      <IconFont name="icon-uniFE" />
      <IconFont name="icon-tags" />
    </div>
  );
};
