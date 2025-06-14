import React, { useEffect, useRef, useState } from "react";

// Sample images - replace with your actual image URLs
const SAMPLE_IMAGES = [
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/262738/pexels-photo-262738.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
  "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=300&h=200",
];

interface CarouselConfig {
  columns: number;
  itemsPerColumn: number;
  baseSpeed: number;
  speedVariations: number[];
}

const CAROUSEL_CONFIG: CarouselConfig = {
  columns: 4,
  itemsPerColumn: 4,
  baseSpeed: 0.3,
  speedVariations: [1, 1.4, 1.8, 1.2],
};

interface CarouselItemProps {
  src: string;
  alt: string;
  index: number;
}

const CarouselItem: React.FC<CarouselItemProps> = React.memo(
  ({ src, alt, index }) => {
    const backgroundColors = [
      "bg-gray-100",
      "bg-gray-200",
      "bg-gray-50",
      "bg-gray-150",
    ];

    return (
      <div
        className={`
        w-full aspect-[3/2] mb-2 sm:mb-3 lg:mb-4 xl:mb-5
        ${backgroundColors[index % backgroundColors.length]}
        rounded-lg sm:rounded-xl
        border border-lime-500 sm:border-2
        shadow-sm sm:shadow-md shadow-lime-200
        overflow-hidden
        group
        h-12 sm:h-16 md:h-24 lg:h-32 xl:h-36
      `}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
        />
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

interface CarouselColumnProps {
  columnIndex: number;
  images: string[];
  isAnimating: boolean;
}

const CarouselColumn: React.FC<CarouselColumnProps> = React.memo(
  ({ columnIndex, images, isAnimating }) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const [translateY, setTranslateY] = useState(0);
    const animationRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    // Create enough items to ensure seamless looping
    const items = React.useMemo(() => {
      const itemsArray = [];
      const totalSets = 4; // Triple the items for seamless loop

      for (let set = 0; set < totalSets; set++) {
        for (let i = 0; i < CAROUSEL_CONFIG.itemsPerColumn; i++) {
          const imageIndex = (columnIndex + i) % images.length;
          itemsArray.push(
            <CarouselItem
              key={`${columnIndex}-${set}-${i}`}
              src={images[imageIndex]}
              alt={`Product ${imageIndex + 1}`}
              index={i}
            />
          );
        }
      }
      return itemsArray;
    }, [columnIndex, images]);

    const animate = React.useCallback(
      (currentTime: number) => {
        if (!lastTimeRef.current) {
          lastTimeRef.current = currentTime;
        }

        const deltaTime = currentTime - lastTimeRef.current;
        lastTimeRef.current = currentTime;

        const speed =
          CAROUSEL_CONFIG.baseSpeed *
          CAROUSEL_CONFIG.speedVariations[columnIndex];
        const pixelsPerMs = speed * 0.1; // Convert to pixels per millisecond
        const movement = pixelsPerMs * deltaTime;

        setTranslateY((prev) => {
          const newTranslateY = prev - movement;

          // Calculate when to reset - when one full set has scrolled
          const itemHeight =
            window.innerWidth < 640
              ? 56 // 48px + 8px margin
              : window.innerWidth < 768
              ? 76 // 64px + 12px margin
              : window.innerWidth < 1024
              ? 108 // 96px + 12px margin
              : window.innerWidth < 1280
              ? 148 // 128px + 20px margin
              : 168; // 144px + 24px margin

          const singleSetHeight = itemHeight * CAROUSEL_CONFIG.itemsPerColumn;

          // Reset when we've scrolled past one complete set
          if (Math.abs(newTranslateY) >= singleSetHeight) {
            return newTranslateY + singleSetHeight;
          }

          return newTranslateY;
        });

        if (isAnimating) {
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      [columnIndex, isAnimating]
    );

    useEffect(() => {
      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [animate, isAnimating]);

    return (
      <div className="flex-1 h-full relative overflow-hidden mx-1 sm:mx-2">
        <div
          ref={columnRef}
          className="absolute w-full transition-none"
          style={{
            transform: `translate3d(0, ${translateY}px, 0)`,
            willChange: "transform",
          }}
        >
          {items}
        </div>
      </div>
    );
  }
);

CarouselColumn.displayName = "CarouselColumn";

const OptimizedCarousel: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [perspective, setPerspective] = useState("1000px");
  const containerRef = useRef<HTMLDivElement>(null);

  // Update perspective based on screen size
  useEffect(() => {
    const updatePerspective = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerspective("400px");
      } else if (width < 768) {
        setPerspective("400px");
      } else if (width < 1024) {
        setPerspective("500px");
      } else if (width < 1280) {
        setPerspective("600px");
      } else {
        setPerspective("1000px");
      }
    };

    // Set initial value
    updatePerspective();

    // Add event listener
    window.addEventListener("resize", updatePerspective);

    // Clean up
    return () => window.removeEventListener("resize", updatePerspective);
  }, []);

  // Pause animation when not visible (performance optimization)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnimating(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen max-w-[1440px] mx-auto overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute top-[20px] sm:top-[35px] md:top-[65px] lg:top-[60px] xl:top-[65px] left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-[27px] sm:bottom-[25px] md:bottom-[28px] lg:bottom-[30px] xl:bottom-[70px] left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Main carousel container */}
      <div
        className="
          h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]
          px-4 sm:px-8 lg:px-16
          transform scale-100
          -mt-8 sm:-mt-12 lg:-mt-20 xl:-mt-24
        "
        style={{
          perspective,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flex justify-between w-full h-full"
          style={{
            transform: "rotateX(55deg) translateZ(0)",
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: CAROUSEL_CONFIG.columns }).map((_, index) => (
            <CarouselColumn
              key={index}
              columnIndex={index}
              images={SAMPLE_IMAGES}
              isAnimating={isAnimating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedCarousel;
