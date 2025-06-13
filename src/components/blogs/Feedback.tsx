import { Carousel } from "@mantine/carousel";
import { useRef, useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EmblaCarouselType } from "embla-carousel";
import "@mantine/carousel/styles.css";
import classes from "../../styles/Feedback.module.css";
import People1 from "../../assets/peoples/people1.png";
import People2 from "../../assets/peoples/people2.png";
import People3 from "../../assets/peoples/people3.png";

const Feedback = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const feedbacks = [
    {
      id: 1,
      quote:
        "The ERP solution transformed our operations, making everything more efficient and transparent. Our team is now more productive than ever",
      author: "Michael Smith",
      image: People1,
      position: "Operations Director",
    },
    {
      id: 2,
      quote:
        "The integration process was seamless, and the support team was incredibly helpful. This software has truly streamlined our workflows.",
      author: "Sarah Brown",
      image: People2,
      position: "CFO",
    },
    {
      id: 3,
      quote:
        "We've seen significant improvements in our reporting and analytics since implementing this ERP system. Highly recommended",
      author: "Emily Johnson",
      image: People3,
      position: "IT Manager",
    },
  ];

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };

    embla.on("select", onSelect);

    return () => {
      embla?.off("select", onSelect);
    };
  }, [embla]);

  return (
    <>
      <div
        id="feedback"
        className="w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-8"
      >
        <div className="w-full mx-auto">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black leading-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Trusted feedback from
            <br />
            our Peoples
          </h1>

          <div className="relative">
            <Carousel
              getEmblaApi={setEmbla}
              withControls
              slideSize="100%"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              classNames={{
                root: classes.carousel,
                controls: classes.controls,
                control: classes.control,
              }}
              emblaOptions={{
                loop: true,
                align: "center",
                containScroll: "trimSnaps",
              }}
              nextControlIcon={<ArrowRight className={classes.controlIcon} />}
              previousControlIcon={
                <ArrowLeft className={classes.controlIcon} />
              }
            >
              {feedbacks.map((feedback) => (
                <Carousel.Slide key={feedback.id}>
                  <div className="relative mt-32 sm:mt-[100px] md:mt-[120px] lg:mt-[135px] mx-4 sm:mx-8 md:mx-12 lg:mx-20 rounded-lg h-[280px] sm:h-[250px] md:h-[300px] lg:h-[300px] flex flex-col lg:flex-row transform transition-all">
                    {/* People Image - Mobile/Tab Top */}
                    <div className="lg:hidden relative w-[160px] sm:w-[170px] md:w-[180px] min-h-[160px] sm:min-h-[170px] md:min-h-[180px] mx-auto -mt-[80px] sm:-mt-16 md:-mt-[89px] z-10 rounded-full overflow-hidden border-3 border-white/20">
                      <img
                        src={feedback.image}
                        alt={feedback.author}
                        className="w-full min-h-full object-cover"
                      />
                    </div>

                    {/* People Image - Desktop Side */}
                    <div className="hidden lg:flex w-full lg:w-[300px] xl:w-[400px] z-10 rounded-lg pr-8 items-end justify-center">
                      <div className="relative rounded-lg w-full flex justify-end items-end">
                        <img
                          src={feedback.image}
                          alt={feedback.author}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:absolute overflow-hidden lg:pl-[300px] xl:pl-[350px] px-4 sm:px-6 lg:pr-[60px] xl:pr-[100px] w-full lg:w-[95%] h-full lg:h-[340px] bottom-0 right-0 bg-lime-500 rounded-lg flex flex-col justify-center items-center">
                      {/* Gradient for mobile */}
                      <span className="lg:hidden absolute -top-[100px] left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-gradient-to-b from-black via-black to-black/30"></span>

                      {/* Gradient for desktop */}
                      <span className="hidden lg:block absolute -top-48 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-b from-black via-black to-black/30"></span>

                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[30px] font-black text-white mb-4 sm:mb-6 leading-6 sm:leading-7 md:leading-8 text-center lg:text-left">
                        {feedback.quote}
                      </p>

                      {/* Name for mobile */}
                      <div className="lg:hidden mt-4 text-center">
                        <p className="text-white/90 font-bold text-sm sm:text-base md:text-lg">
                          {feedback.author}
                        </p>
                        <p className="text-white/70 text-xs sm:text-sm md:text-base">
                          {feedback.position}
                        </p>
                      </div>
                    </div>

                    {/* Name for desktop */}
                    <div className="hidden lg:flex absolute bottom-10 right-10 xl:right-28 justify-center items-start">
                      <p className="z-10 text-lg xl:text-[22px] font-black text-white/90 mt-6 xl:mt-10">
                        {feedback.author}
                      </p>
                      <span className="absolute w-[200px] xl:w-[250px] h-[200px] xl:h-[250px] rounded-full bg-gradient-to-t from-black via-black to-black/30"></span>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>

            {/* Custom Dot Indicators */}
            <div className="flex justify-center mt-4 sm:mt-5 gap-1.5">
              {feedbacks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => embla?.scrollTo(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "bg-white" : "bg-neutral-700"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
