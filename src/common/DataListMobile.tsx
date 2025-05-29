import React, { useRef, useEffect, useState, useMemo } from "react";
import styled from "styled-components";

// Import local images
import Image1 from "../assets/products/image1.png";
import Image2 from "../assets/products/image2.png";
import Image3 from "../assets/products/image3.png";
import Image4 from "../assets/products/image4.png";

// Configuration
const CONFIG = {
  columns: 4,
  itemsPerColumn: 4,
  scrollSpeed: 0.5,
  itemHeight: 60,
  gap: 6.67,
  colors: ["#f5f5f5", "#e0e0e0", "#ebebeb", "#f0f0f0"],
  images: [Image1, Image2, Image3, Image4],
};

// Define props for Card component
interface CardProps {
  index: number;
}

// Styled components with proper typing
const CarouselContainer = styled.div`
  width: 100%;
  height: 134px;
  position: relative;
  perspective: 1000px;
  overflow: hidden;
`;

const RailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: -60px;
  padding: 0 5%;
  transform: rotateX(60deg);
  transform-style: preserve-3d;
`;

const RailColumn = styled.div`
  width: calc(25% - 4px);
  height: 100%;
  position: relative;
`;

interface RailProps {
  offset: number;
}

const Rail = styled.div<RailProps>`
  position: absolute;
  width: 100%;
  transform: translate3d(0, ${(props) => props.offset}px, 0);
  will-change: transform;
`;

const Card = styled.div<CardProps>`
  width: 100%;
  height: ${CONFIG.itemHeight}px;
  margin-bottom: ${CONFIG.gap}px;
  background: ${(props) => CONFIG.colors[props.index % CONFIG.colors.length]};
  border-radius: 4px;
  border: 0.5px solid #84cc16;
  box-shadow: 0 0px 2px 0px rgba(163, 230, 53, 0.9);
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  filter: saturate(0);

  &:hover {
    transform: scale(1.05);
    filter: saturate(1);
  }
`;

const DataListMobile: React.FC = () => {
  const [offsets, setOffsets] = useState<number[]>(
    Array(CONFIG.columns).fill(0)
  );
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(0);

  const singleColumnHeight = useMemo(
    () => (CONFIG.itemHeight + CONFIG.gap) * CONFIG.itemsPerColumn,
    []
  );

  const columnItems = useMemo(() => {
    return Array.from({ length: CONFIG.columns }).map((_, columnIndex) => {
      const items = [];

      for (let set = 0; set < 2; set++) {
        for (let i = 0; i < CONFIG.itemsPerColumn; i++) {
          const imageIndex = (columnIndex + i) % CONFIG.images.length;
          items.push(
            <Card key={`${columnIndex}-${set}-${i}`} index={i}>
              <ProductImage
                src={CONFIG.images[imageIndex]}
                alt={`Product ${imageIndex + 1}`}
                loading="lazy"
              />
            </Card>
          );
        }
      }

      return items;
    });
  }, []);

  const animate = (time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    setOffsets((prev) => {
      const speeds = [0.5, 0.7, 0.9, 0.6];
      return prev.map((offset, i) => {
        let newOffset =
          offset - speeds[i] * CONFIG.scrollSpeed * (deltaTime / 16);

        if (newOffset <= -singleColumnHeight) {
          newOffset += singleColumnHeight;
        }

        return newOffset;
      });
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleColumnHeight]);

  return (
    <>
      <div className="scale-[1] sm:scale-[1.9] md:scale-[2.4] relative min-w-[320px] h-[130px] mx-auto mb-8 sm:my-12 md:my-20 overflow-hidden">
        <div className="h-12 w-full z-10 absolute -top-1 left-0 bg-gradient-to-b from-black to-transparent"></div>
        <div className="h-full w-12 z-10 absolute top-0 left-0 bg-gradient-to-r from-black to-transparent"></div>
        <CarouselContainer>
          <RailsContainer>
            {Array.from({ length: CONFIG.columns }).map((_, i) => (
              <RailColumn key={i}>
                <Rail offset={offsets[i]}>{columnItems[i]}</Rail>
              </RailColumn>
            ))}
          </RailsContainer>
        </CarouselContainer>
        <div className="h-full w-12 z-10 absolute top-0 right-0 bg-gradient-to-l from-black to-transparent"></div>
        <div className="h-12 w-full z-10 absolute -bottom-1 left-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </>
  );
};

export default DataListMobile;
