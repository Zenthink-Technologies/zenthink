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
      embla.off("select", onSelect);
    };
  }, [embla]);

  return (
    <>
      <div id="feedback" className="w-full max-w-[1440px] mx-auto py-14 px-4">
        <div className="w-full mx-auto">
          <h1 className="text-center text-[40px] font-black leading-tight mb-12">
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
                  <div className="relative mt-[135px] mx-20 rounded-lg h-[300px] flex transform transition-all">
                    {/* People Image */}
                    <div className="w-[400px] z-10 rounded-lg pr-8 flex items-end justify-center">
                      <div className="relative rounded-lg w-full">
                        <img
                          src={feedback.image}
                          alt={feedback.author}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute overflow-hidden pl-[350px] pr-[100px] w-[95%] h-[340px] bottom-0 right-0 bg-black/20 rounded-lg flex flex-col justify-center items-center">
                      <span className="absolute -top-48 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-b from-black via-black to-black/30"></span>
                      <p className="text-[30px] font-black text-white mb-6 leading-8">
                        {feedback.quote}
                      </p>
                    </div>

                    {/* Name */}
                    <div className="absolute bottom-10 right-28 flex justify-center items-start">
                      <p className="z-10 text-[22px] font-black text-white/90 mt-10">
                        {feedback.author}
                      </p>
                      <span className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-t from-black via-black to-black/30"></span>
                    </div>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>

            {/* Custom Dot Indicators */}
            <div className="flex justify-center mt-5 gap-1.5">
              {feedbacks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => embla?.scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
