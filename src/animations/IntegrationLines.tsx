import { useEffect, useRef } from "react";

const IntegrationLines = () => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateLines = () => {
      if (line1Ref.current) {
        line1Ref.current.style.transform = `translate3d(${
          Math.sin(Date.now() / 1000) * 100
        }px, 0px, 0px) scale3d(1, 1, 1)`;
      }
      if (line2Ref.current) {
        line2Ref.current.style.transform = `translate3d(${
          Math.cos(Date.now() / 1000) * -100
        }px, 0px, 0px) scale3d(1, 1, 1)`;
      }
      if (line3Ref.current) {
        line3Ref.current.style.transform = `translate3d(0px, ${
          Math.sin(Date.now() / 800) * -50
        }px, 0px) scale3d(1, 1, 1) rotateZ(92deg)`;
      }
      if (line4Ref.current) {
        line4Ref.current.style.transform = `translate3d(0px, ${
          Math.cos(Date.now() / 800) * 50
        }px, 0px) scale3d(1, 1, 1) rotateZ(90deg)`;
      }
      requestAnimationFrame(animateLines);
    };

    const animationId = requestAnimationFrame(animateLines);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <div className="relative w-full h-full bg-red-100">
        {/* Background Lines Container */}
        <div className="absolute inset-0">
          {/* First Line */}
          <div className="absolute w-full">
            <div
              ref={line1Ref}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
              style={{
                transform: "translate3d(569px, 0px, 0px) scale3d(1, 1, 1)",
              }}
            />
          </div>

          {/* Second Line */}
          <div className="absolute w-full">
            <div
              ref={line2Ref}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
              style={{
                transform: "translate3d(-257.603px, 0px, 0px) scale3d(1, 1, 1)",
                willChange: "transform",
              }}
            />
          </div>

          {/* Third Line (Vertical) */}
          <div className="absolute h-full top-0 left-1/2">
            <div
              ref={line3Ref}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent h-full"
              style={{
                transform:
                  "translate3d(0px, -103px, 0px) rotateZ(92deg) scale3d(1, 1, 1)",
              }}
            />
          </div>

          {/* Fourth Line (Vertical) */}
          <div className="absolute h-full top-0 left-1/2">
            <div
              ref={line4Ref}
              className="absolute w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent h-full"
              style={{
                transform:
                  "translate3d(0px, 141px, 0px) rotateZ(90deg) scale3d(1, 1, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationLines;
