import { useAppStore } from "@/store";
import { useEffect } from "react";

export const useInit = () => {
  const [setIsMobile] = useAppStore((state) => [state.setIsMobile]);

  useEffect(() => {
    const widthMql = window.matchMedia("(max-width: 768px)");
    setIsMobile(widthMql.matches);
    const handleWidthChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    widthMql.addEventListener("change", handleWidthChange);

    return () => {
      widthMql.removeEventListener("change", handleWidthChange);
    };
  }, [setIsMobile]);
};
