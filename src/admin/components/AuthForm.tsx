import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [error, setError] = useState("");
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(-242);
  const [containerWidth, setContainerWidth] = useState(300);

  // Disable background scrolling and get container width
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await googleLogin();
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin-zenboard");
    } catch (err) {
      setError("Failed to authenticate with Google. Please try again.");
      console.error(err);
    }
  }, [googleLogin, navigate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - translateX);
    document.body.style.userSelect = "none"; // Prevent text selection during drag
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - translateX);
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;

      const newTranslateX = clientX - startX;
      const maxTranslateX = 0;
      const minTranslateX = -242;

      // Apply rubber band effect when dragging beyond limits
      if (newTranslateX > maxTranslateX) {
        const overPull = newTranslateX - maxTranslateX;
        setTranslateX(maxTranslateX + overPull * 0.3);
        return;
      }

      if (newTranslateX < minTranslateX) {
        const overPull = newTranslateX - minTranslateX;
        setTranslateX(minTranslateX + overPull * 0.3);
        return;
      }

      setTranslateX(newTranslateX);
    },
    [isDragging, startX]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleEndDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    document.body.style.userSelect = ""; // Re-enable text selection

    // Calculate threshold (60% of width)
    const threshold = containerWidth * 0.6;
    const currentPosition = Math.abs(translateX);

    if (currentPosition >= threshold) {
      // Complete the swipe with momentum animation
      setTranslateX(0);
      setTimeout(handleGoogleLogin, 300); // Delay login to allow animation to complete
    } else {
      // Snap back with spring animation
      setTranslateX(-242);
    }
  }, [containerWidth, handleGoogleLogin, isDragging, translateX]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEndDrag);
      window.addEventListener("touchend", handleEndDrag);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEndDrag);
      window.removeEventListener("touchend", handleEndDrag);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEndDrag);
      window.removeEventListener("touchend", handleEndDrag);
      document.body.style.userSelect = "";
    };
  }, [handleEndDrag, handleMouseMove, handleTouchMove, isDragging, translateX]);

  return (
    <div className="w-full max-w-[1440px] mx-auto h-auto pt-16 md:pt-0 py-14 px-4 pb-20 md:pb-24 lg:pb-28 xl:pb-32">
      <div className="w-full max-w-[1440px] h-auto mx-auto flex flex-col justify-start items-center">
        <h1 className="text-[60px] md:text-[100px] lg:text-[120px] xl:text-[150px] mt-12 lg:mt-0 text-center font-black uppercase tracking-widest bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <div className="relative h-[30px] lg:h-[35px] xl:h-[40px] -mt-7 md:-mt-8 lg:-mt-14 xl:-mt-20 w-[120px] lg:w-[150px] xl:w-[170px] rounded-[50px] overflow-hidden bg-neutral-900">
          <div className="glow-effect clockwise"></div>
          <div className="glow-effect counter-clockwise"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[11px] md:text-[12px] lg:text-[15px] xl:text-[19px] font-black z-10">
              Login
            </span>
          </div>
          <div className="absolute inset-[1.5px] rounded-[48px] bg-black/80 z-0"></div>
        </div>

        <div className="mt-24 w-full max-w-md space-y-6">
          <div
            ref={containerRef}
            className="relative mx-auto w-[300px] rounded-full h-[60px] flex items-center justify-center overflow-hidden bg-white/5 hover:bg-neutral-950 border border-white/10 text-white font-medium transition-all duration-300"
          >
            {/* Custom Swipeable Button */}
            <div
              ref={buttonRef}
              className="w-full h-full flex justify-end items-center bg-black/50 backdrop-blur-sm z-10 rounded-full absolute"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: isDragging
                  ? "none"
                  : `transform ${
                      Math.abs(translateX) > 100 ? 0.3 : 0.5
                    }s cubic-bezier(0.18, 0.89, 0.32, 1.28)`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center gap-3 py-3 px-4 bg-white/0 text-white font-medium transition-all duration-300 cursor-grab active:cursor-grabbing"
                style={{
                  boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                  `,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                  className="transition-transform duration-100 transform active:scale-90"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
              </div>
            </div>
            <span className="z-0 absolute left-0 right-0 text-center">
              Let's Think!
            </span>
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
