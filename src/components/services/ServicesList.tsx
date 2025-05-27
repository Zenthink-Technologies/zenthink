import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import backgroundImage from "../../assets/services/service1.webp";

const Section = ({
  titleLine1,
  titleLine2,
  description,
  variant = "default",
}: {
  titleLine1: string;
  titleLine2: string;
  description: string;
  variant?: "default" | "alt" | "alt2";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center 85%", "center 15%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  return (
    <div
      className={`w-full h-auto max-w-[1440px] max-h-[600px] mx-auto content-wrapper ${
        variant === "alt" ? "alt-style" : variant === "alt2" ? "alt-style2" : ""
      }`}
      ref={ref}
    >
      <motion.div
        className={`animated-content ${variant === "alt" ? "end-align" : ""}`}
        style={{ opacity, scale, y }}
      >
        <h2
          className={`crafted-title ${
            variant === "alt" ? "text-black end-align" : ""
          }`}
        >
          <span className="line-mask">
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {titleLine1}
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {titleLine2}
            </motion.span>
          </span>
        </h2>

        <motion.p
          className={`crafted-description ${
            variant === "alt" ? "text-black end-align" : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

const ScreenCraftedAnimation = () => {
  return (
    <div className="crafted-container pt-14 border-t-[1.5px] border-lime-400/10">
      {/* Fixed Background Image */}
      <div
        className="static-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Sections */}
      <Section
        titleLine1="Crafted for the"
        titleLine2="screen"
        description="Immersive digital experiences designed to captivate and engage your audience."
      />
      <Section
        variant="alt"
        titleLine1="Built to perform"
        titleLine2="Something"
        description="High-speed, optimized web experiences built for performance and scalability."
      />
      <Section
        variant="alt2"
        titleLine1="Designed with"
        titleLine2="precision"
        description="Every detail is thoughtfully crafted to deliver clarity, beauty, and usability."
      />
    </div>
  );
};

export default ScreenCraftedAnimation;
