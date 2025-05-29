import ServiceLogos from "./ServiceLogos";
import ServiceLogosReverse from "./ServiceLogosReverse";

const LogoSliderService = () => {
  return (
    <>
      <div className="w-full min-h-full flex flex-col overflow-hidden justify-center items-center space-y-12 rotate-90 lg:scale-[1.4] xl:scale-[1.165]">
        <ServiceLogosReverse />
        <ServiceLogos />
      </div>
    </>
  );
};

export default LogoSliderService;
