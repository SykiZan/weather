import { useEffect, useState } from "react";

interface ScreenDimensions {
  width: number;
  height: number;
}

const useScreenDimensions = (): ScreenDimensions => {
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = (): void => {
    setScreenDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenDimensions;
};

export default useScreenDimensions;