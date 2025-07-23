import { useInit } from "@/hooks/useInit";
import { useAppStore } from "@/store";
import { useEffect } from "react";

export const Provider = ({ pathname }: { pathname: string }) => {
  useInit();

  const [setPathName] = useAppStore((store) => [store.setPathname]);

  useEffect(() => {
    const pathName = decodeURI(pathname);
    // 去掉 pathName 结尾的 '/'
    if (pathName !== "/") {
      setPathName(pathName.replace(/\/$/, ""));
    } else {
      setPathName(pathName);
    }
  }, [pathname]);

  return null;
};
