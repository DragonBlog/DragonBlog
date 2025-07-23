import { useAppStore } from "@/store";

export const Header = () => {
  const { isMobile } = useAppStore();
  console.log("isMobile", isMobile);
  return <div>abc</div>;
};
