import { useEffect, useRef, useState } from "react";

export const useDockHoverEffect = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scales, setScales] = useState<number[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const bounds = containerRef.current.getBoundingClientRect();
      const midX = e.clientX - bounds.left;

      const items = Array.from(containerRef.current.children);
      const newScales = items.map((_, index) => {
        const item = items[index] as HTMLElement;
        const itemX = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(midX - itemX);
        const maxDistance = 100;
        const scale = Math.max(1, 2 - distance / maxDistance);
        return +scale.toFixed(2);
      });

      setScales(newScales);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => {
        setScales(Array(container.children.length).fill(1));
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return { containerRef, scales };
};
