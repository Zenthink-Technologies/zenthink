import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Minus } from "lucide-react";
import Service1 from "../../assets/services/service1.webp";
import Service2 from "../../assets/services/service2.webp";
import Service3 from "../../assets/services/service3.webp";

type FilmContent = {
  id: number;
  image: string;
  year: string;
  award: string;
  ratings: {
    stars: string;
    quote: string;
    source: string;
  }[];
  category: string;
  title: string;
  director: string;
};

const ServiceCards = () => {
  const films: FilmContent[] = [
    {
      id: 1,
      image: Service1,
      year: "2024",
      award: "Berlin Independent Cinema Prize",
      ratings: [
        {
          stars: "★★★★★",
          quote: "Raw, immediate, unforgettable.",
          source: "Film Comment",
        },
        {
          stars: "★★★★★",
          quote: "Framehaus at its most visceral.",
          source: "Sight & Sound",
        },
      ],
      category: "Short Film",
      title: "FEVER\nCOAST",
      director: "Akira Nomura",
    },
    {
      id: 2,
      image: Service2,
      year: "2024",
      award: "Berlin Independent Cinema Prize",
      ratings: [
        {
          stars: "★★★★★",
          quote: "Raw, immediate, unforgettable.",
          source: "Film Comment",
        },
        {
          stars: "★★★★★",
          quote: "Framehaus at its most visceral.",
          source: "Sight & Sound",
        },
      ],
      category: "Short Film",
      title: "FEVER\nCOAST",
      director: "Akira Nomura",
    },
    {
      id: 3,
      image: Service3,
      year: "2024",
      award: "Berlin Independent Cinema Prize",
      ratings: [
        {
          stars: "★★★★★",
          quote: "Raw, immediate, unforgettable.",
          source: "Film Comment",
        },
        {
          stars: "★★★★★",
          quote: "Framehaus at its most visceral.",
          source: "Sight & Sound",
        },
      ],
      category: "Short Film",
      title: "FEVER\nCOAST",
      director: "Akira Nomura",
    },
  ];

  return (
    <div className="space-y-14 pt-14 pb-2 px-28">
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

  // Animation values with initial visibility
  const yBg = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), {
    stiffness: 100,
    damping: 20,
  });

  const yText = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "200%"]),
    { stiffness: 100, damping: 20 }
  );

  // Scale animation (starts at 1, zooms slightly during scroll)
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]),
    { stiffness: 1550, damping: 20 }
  );

  const scaleContainer = useSpring(
    useTransform(scrollYProgress, [-2, 0.5, 1], [0.8, 1.0, 0.8]),
    {
      stiffness: 150,
      damping: 30,
      mass: 0.5,
    }
  );

  // Content is always fully visible (opacity 1)
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <>
      <motion.div
        className="relative h-[700px] w-full rounded-3xl"
        style={{ scale: scaleContainer }}
      >
        <div
          ref={frameRef}
          className="parallax-frame animate-shake absolute inset-0 border-2 rounded-3xl border-white border-opacity-20 pointer-events-none transition-transform duration-300 ease-out z-30"
        />

        <div
          ref={containerRef}
          className="relative h-full w-full overflow-hidden rounded-3xl bg-black "
        >
          {/* Image with scroll effects but always visible */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              y: yBg,
              scale,
              opacity,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <img
              src={film.image}
              alt={film.title}
              className="w-full h-full scale-[1.1] object-cover"
            />
          </motion.div>

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl z-10" />

          {/* Content - always fully visible */}
          <motion.div
            className="relative z-20 h-full w-full flex flex-col justify-between rounded-3xl p-6 sm:p-8 md:p-14 lg:p-28"
            style={{
              y: yText,
              opacity: contentOpacity,
            }}
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
              <div>
                <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-white">
                  <b className="font-sans text-xs sm:text-sm">{film.year}</b>{" "}
                  <span className="mx-2">|</span> {film.award}
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 text-right">
                {film.ratings.map((rating, index) => (
                  <div key={index}>
                    <p className="text-base sm:text-lg font-semibold text-white">
                      {rating.stars}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-white">
                      {rating.quote}
                    </p>
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-300">
                      {rating.source}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Content */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
              <div>
                <p className="uppercase text-sm sm:text-base md:text-lg tracking-widest mb-2 text-white">
                  {film.category}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white whitespace-pre-line">
                  {film.title}
                </h1>
                <p className="text-xs sm:text-sm mt-2 text-white">
                  Director: {film.director}
                </p>
              </div>

              <button className="flex justify-center items-center group gap-x-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold uppercase px-4 sm:px-6 py-2 tracking-wide hover:text-lime-400 hover:bg-black bg-white text-black hover:shadow-[0_0_20px_0px_#000000,inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] shadow-[0_0_20px_0px_#000000,inset_0_-5px_5px_rgba(0,0,0,0.025),_inset_0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-700 ease-in-out">
                <Minus className="rotate-90 w-4 h-4 group-hover:translate-x-2 group-hover:text-white text-lime-400 transition-all duration-300 ease-in-out" />
                Explore
                <Minus className="rotate-90 w-4 h-4 group-hover:-translate-x-2 group-hover:text-white text-lime-400 transition-all duration-700 ease-in-out" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceCards;
