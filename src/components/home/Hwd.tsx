import React, { useEffect, useState } from "react";
import Favicon from "../../assets/favicon.svg";
const Hwd = () => {
  // Array of unique image URLs, one for each icon (index 0 to 10)
  const iconUrls = [
    Favicon, // top-left corner
    Favicon, // top icon 1
    Favicon, // top icon 2
    Favicon, // top icon 3
    Favicon, // top-right corner
    Favicon, // bottom-right corner
    Favicon, // bottom icon 1
    Favicon, // bottom icon 2
    Favicon, // bottom icon 3
    Favicon, // bottom icon 4
    Favicon, // bottom-left corner
  ];

  // Corner points
  const corners = [
    { x: 50, y: 0 }, // 150 / 3
    { x: 250, y: 0 }, // 750 / 3
    { x: 300, y: 40 }, // 900 / 3, 160 / 4
    { x: 0, y: 40 }, // 0, 160 / 4
  ];

  const topIcons = Array.from({ length: 3 }).map((_, i) => ({
    x: 50 + ((i + 1) * 200) / 4, // 600 / 3 = 200, then divide across 4 sections
    y: 0,
  }));

  const bottomIcons = Array.from({ length: 4 }).map((_, i) => ({
    x: ((i + 1) * 300) / 5, // 900 / 3 = 300
    y: 40,
  }));

  const allIcons = [
    corners[0], // 0: top-left corner
    ...topIcons, // 1,2,3: top side icons
    corners[1], // 4: top-right corner
    corners[2], // 5: bottom-right corner
    ...bottomIcons, // 6,7,8,9: bottom side icons
    corners[3], // 10: bottom-left corner
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allIcons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [allIcons.length]);

  return (
    <>
      <div
        id="how_we_do"
        className="w-full max-w-[1440px] mx-auto h-[210px] md:h-[350px] lg:h-[450px] xl:h-[550px] relative py-10 md:py-12 lg:py-14"
      >
        <h1 className="text-center text-[20px] md:text-[30px] lg:text-[35px] xl:text-[40px] font-black leading-tight text-white">
          From Concept to Code
          <br />
          Our Proven Process
        </h1>

        <div
          className="mt-8 sm:mt-14 md:mt-20 lg:mt-24 xl:mt-32 mx-auto 
          flex justify-center items-center relative scale-[0.9] sm:scale-[1.5] md:scale-[2] lg:scale-[2.5] xl:scale-[3]"
          style={{ width: 300, height: 40 }}
        >
          <svg width="300" height="40" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal top edge */}
            <line
              x1={corners[0].x}
              y1={corners[0].y}
              x2={corners[1].x}
              y2={corners[1].y}
              stroke="gray"
              strokeWidth={1}
            />
            {/* Vertical-right edge */}
            <line
              x1={corners[1].x}
              y1={corners[1].y}
              x2={corners[2].x}
              y2={corners[2].y}
              stroke="gray"
              strokeWidth={0.5}
            />
            {/* Horizontal bottom edge */}
            <line
              x1={corners[2].x}
              y1={corners[2].y}
              x2={corners[3].x}
              y2={corners[3].y}
              stroke="gray"
              strokeWidth={1}
            />
            {/* Vertical-left edge */}
            <line
              x1={corners[3].x}
              y1={corners[3].y}
              x2={corners[0].x}
              y2={corners[0].y}
              stroke="gray"
              strokeWidth={0.5}
            />
          </svg>

          {allIcons.map(({ x, y }, i) => {
            const topIndices = [0, 1, 2, 3, 4];
            const bottomRightCorner = 5;
            const bottomSideIcons = [6, 7, 8, 9];
            const bottomLeftCorner = 10;

            const topCount = topIndices.length;
            const bottomCount = 1 + bottomSideIcons.length + 1;

            const totalCycle = topCount + bottomCount;

            const cyclePos = activeIndex % totalCycle;

            let isActive = false;

            if (cyclePos < topCount) {
              isActive = i === topIndices[cyclePos];
            } else {
              const bottomPos = cyclePos - topCount;
              if (bottomPos === 0) {
                isActive = i === bottomRightCorner;
              } else if (bottomPos === bottomCount - 1) {
                isActive = i === bottomLeftCorner;
              } else {
                const reversedBottomSides = [...bottomSideIcons].reverse();
                isActive = i === reversedBottomSides[bottomPos - 1];
              }
            }

            return (
              <img
                key={`icon-${i}`}
                src={iconUrls[i]}
                alt={`icon-${i}`}
                style={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  left: x - 15,
                  top: y - 15,
                  padding: "1.5px",
                  backgroundColor: "darkgray",
                  borderRadius: "50%",
                  filter: isActive ? "none" : "grayscale(100%) saturate(0%)",
                  transition: "filter 0.5s ease",
                }}
                draggable={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hwd;
