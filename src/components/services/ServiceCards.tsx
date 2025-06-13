import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Minus } from "lucide-react";
import Service1 from "../../assets/services/service1.webp";
import Service2 from "../../assets/services/service2.webp";
import Service3 from "../../assets/services/service3.webp";

type FilmContent = {
  id: number;
  image: string;
  quote: string;
  points: string[];
  title: string;
  description: string;
};

const ServiceCards = () => {
  const films: FilmContent[] = [
    {
      id: 1,
      image: Service1,
      quote:
        "We build apps that are user-friendly and designed to elevate from day one.",
      points: [
        "Cross-platform apps (Android & iOS)",
        "Modern, intuitive UI/UX",
        "Fast, secure, and scalable",
      ],
      title: "Mobile App\nDevelopment",
      description: "Put your business in your customer’s pocket.",
    },
    {
      id: 2,
      image: Service2,
      quote:
        "We tailor web apps to fit your business — not the other way around.",
      points: [
        "Powerful dashboards & Management systems",
        "Responsive design",
        "Custom workflows, secure access",
      ],
      title: "⁠Web Application\nDevelopment",
      description: "Simplify, streamline, and scale — all in one platform.",
    },
    {
      id: 3,
      image: Service3,
      quote:
        "Say goodbye to generic software. Our custom solutions drive business growth.",
      points: [
        "⁠ERP & CRM systems",
        "⁠Custom websites",
        "HRMS, sales tracking, inventory etc.",
        "Dashboards, automation, and reporting",
      ],
      title: "Custom Business\nSolutions",
      description: "Tools that work like your team does.",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-14 pt-14 pb-2 px-4 md:px-10 lg:px-20 xl:px-28 w-full h-auto max-w-[1440px] mx-auto">
      {films.map((film, index) => (
        <FilmContainer
          key={film.id}
          film={film}
          isFirst={index === 0}
          isLast={index === films.length - 1}
        />
      ))}
    </div>
  );
};

const FilmContainer = ({
  film,
  isFirst,
  isLast,
}: {
  film: FilmContent;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), {
    stiffness: 100,
    damping: 20,
  });

  const yText = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "200%"]),
    { stiffness: 100, damping: 20 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]),
    { stiffness: 1550, damping: 20 }
  );

  const scaleContainer = useSpring(
    useTransform(scrollYProgress, [-2, 0.5, 1], [0.8, 1.0, 0.8]),
    { stiffness: 150, damping: 30, mass: 0.5 }
  );

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <motion.div
      className="relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] w-full rounded-3xl"
      style={{ scale: scaleContainer }}
    >
      <div
        ref={frameRef}
        className="parallax-frame animate-shake absolute inset-0 border-2 rounded-3xl border-white border-opacity-20 pointer-events-none transition-transform duration-300 ease-out z-30"
      />

      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-3xl bg-black"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: yBg, scale, opacity }}
        >
          <img
            src={film.image}
            alt={film.title}
            className="w-full h-full scale-[1.1] object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl z-10" />

        <motion.div
          className="relative z-20 h-full w-full flex flex-col justify-between rounded-3xl p-6 sm:p-8 md:p-10 lg:p-20 xl:p-28"
          style={{ y: yText, opacity: contentOpacity }}
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
            <div>
              <p className="text-xs xs:text-sm sm:text-base md:text-[17px] font-light tracking-wide text-white">
                {film.quote}
              </p>
            </div>

            <div className="space-y-3 xs:space-y-4 sm:space-y-6 text-right w-full">
              <ul className="space-y-2">
                {film.points.map((point, index) => (
                  <li
                    key={index}
                    className="text-sm xs:text-base sm:text-lg text-white text-end flex justify-end items-center"
                  >
                    <p className="w-1.5 h-1.5 bg-lime-500/50 backdrop-blur-sm rounded-full mr-2" />{" "}
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 xs:gap-6 sm:gap-0">
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white whitespace-pre-line">
                {film.title}
              </h1>
              <p className="text-[10px] xs:text-xs sm:text-sm mt-1 xs:mt-2 text-white">
                {film.description}
              </p>
            </div>

            <button className="flex justify-center items-center group gap-x-2 xs:gap-x-3 rounded-lg text-xs xs:text-sm sm:text-base md:text-lg font-semibold uppercase px-3 xs:px-4 sm:px-6 py-1 xs:py-2 tracking-wide hover:text-lime-400 hover:bg-black bg-white text-black hover:shadow-[0_0_20px_0px_#000000,inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] shadow-[0_0_20px_0px_#000000,inset_0_-5px_5px_rgba(0,0,0,0.025),_inset_0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-700 ease-in-out">
              <Minus className="rotate-90 w-3 h-3 xs:w-4 xs:h-4 group-hover:translate-x-2 group-hover:text-white text-lime-400 transition-all duration-300 ease-in-out" />
              Explore
              <Minus className="rotate-90 w-3 h-3 xs:w-4 xs:h-4 group-hover:-translate-x-2 group-hover:text-white text-lime-400 transition-all duration-700 ease-in-out" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCards;
