import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

interface ColorStage {
  bg: string;
  text: string;
}

const LoadingAnimation: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const colorStages: ColorStage[] = [{ bg: "#000000", text: "#a3e635" }];

    const updateColors = (progress: number) => {
      const stage = Math.floor(progress / 25);
      if (
        stage < colorStages.length &&
        preloaderRef.current &&
        progressBarRef.current &&
        percentageRef.current
      ) {
        preloaderRef.current.style.backgroundColor = colorStages[stage].bg;
        progressBarRef.current.style.backgroundColor = colorStages[stage].text;

        const textElements = document.querySelectorAll(
          ".loading-text .char, .percentage"
        );
        textElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.color = colorStages[stage].text;
          }
        });
      }
    };

    // Initialize SplitType
    const loadingText = new SplitType(".loading-text.initial", {
      types: "chars",
    });
    const completeText = new SplitType(".loading-text.complete", {
      types: "chars",
    });
    const titleText = new SplitType(".content h1", { types: "chars" });
    const paragraphText = new SplitType(".content p", { types: "chars" });

    // Initial states
    gsap.set(".loading-text.complete", { y: "100%" });
    gsap.set(loadingText.chars, { opacity: 0, y: 100 });
    gsap.set(completeText.chars, { opacity: 0, y: 100 });

    // Animate in loading text
    gsap.to(loadingText.chars, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "power2.out",
    });

    const tl = gsap.timeline();

    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power1.inOut",
      onUpdate: function () {
        if (percentageRef.current) {
          const progress = Math.round(this.progress() * 100);
          percentageRef.current.textContent = progress.toString();
          updateColors(progress);
        }
      },
    })
      .to(".loading-text.initial", {
        y: "-100%",
        duration: 0.1,
        ease: "power2.inOut",
      })
      .to(
        ".loading-text.complete",
        {
          y: "0%",
          duration: 0.1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        completeText.chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: "power2.out",
        },
        "<0.2"
      )
      .to(preloaderRef.current, {
        y: "-100vh",
        duration: 1,
        ease: "power2.inOut",
        delay: 0.8,
      })
      .set(
        contentRef.current,
        {
          visibility: "visible",
        },
        "-=1"
      )
      .to(
        [titleText.chars, paragraphText.chars],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .set(preloaderRef.current, {
        display: "none",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div className="preloader" ref={preloaderRef}>
        <div className="progress-container">
          <div className="progress-bar" ref={progressBarRef}></div>
        </div>
        <div className="text-container">
          <div className="loading-text initial">Loading</div>
          <div className="loading-text complete">Complete</div>
        </div>
        <div className="percentage" ref={percentageRef}>
          0
        </div>
      </div>

      <div className="content" ref={contentRef}>
        <h1>Welcome to the Website</h1>
        <p>This content appears after the preloader finishes.</p>
      </div>
    </>
  );
};

export default LoadingAnimation;
