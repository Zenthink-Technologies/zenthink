import { Button } from "@heroui/button";
import OptimizedCarousel from "../../common/OptimizedCarousel";

const HeroHome = () => {
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pb-12">
        <h1 className="dosis text-[35px] sm:text-[60px] lg:text-[90px] font-bold text-center mt-16 sm:mt-20 lg:mt-28 leading-tight">
          Ideas - Digital Platforms
        </h1>
        <p className="dosis text-[13px] sm:text-[20px] lg:text-[25px] font-medium text-center text-white/70 mt-1 md:mt-3 lg:mt-0 sm:mt-6">
          We transform raw ideas into dynamic digital platforms.
        </p>

        <div className="mx-auto w-[80vw] flex justify-center items-center mt-4 md:mt-8 space-x-3">
          <Button
            onPress={() => {
              const target = document.getElementById("clients");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="hover:opacity-90 bg-gradient-to-tr from-lime-500 via-lime-600 to-black backdrop-blur-md rounded-full px-8 lg:px-14 h-[45px] sm:h-[50px] transition-all duration-500 ease-in-out w-auto"
          >
            <span className="dosis text-white text-[13px] sm:text-[16px] font-semibold z-10">
              Ready to digitize your vision
            </span>
          </Button>
        </div>
      </div>

      {/* Our Product and Client Logo Carousel */}
      <OptimizedCarousel />
    </>
  );
};

export default HeroHome;
