import { useAppStore } from "@/store";
import { HeadMenu } from "./HeadMenu";

export const Header = () => {
  const { isMobile } = useAppStore();

  return (
    <div>
      <HeadMenu isBgShow />
    </div>
  );
};
