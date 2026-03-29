import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.pageYOffset;
      // Added a small threshold (10px) to prevent flickering on mobile
      if (Math.abs(currentY - prevScrollY.current) < 10) return;

      const direction = currentY > prevScrollY.current ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      prevScrollY.current = currentY > 0 ? currentY : 0;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  return scrollDirection;
}
