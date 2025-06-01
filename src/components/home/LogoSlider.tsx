import ClientLogos from "../../animations/ClientLogos";
import ClientLogosReverse from "../../animations/ClientLogosReverse";
import Logo from "../../assets/favicon.svg";

const LogoSlider = () => {
  return (
    <>
      <div
        id="clients"
        className="w-screen max-w-[1440px] mx-auto py-10 md:py-12 lg:py-14"
      >
        <h1 className="text-center text-[20px] md:text-[25px] lg:text-[30px] font-bold leading-7 md:leading-8 lg:leading-9 w-[250px] md:w-[300px] lg:w-[400px] mx-auto">
          Strategic Alliances for Digital Transformation
        </h1>
        <div className="flex justify-center items-center relative">
          <ClientLogosReverse />
          <div className="absolute z-10 min-w-24 md:min-w-28 lg:min-w-32 h-full bg-black flex justify-center items-center shadow-[0_0_30px_0px_rgba(0,0,0,1)]">
            <div className="absolute z-10 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex justify-center items-center bg-black rounded-full backdrop-blur-lg shadow-[0_0_30px_0px_rgba(255,255,255,0.4)]">
              <div className="absolute z-20 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 p-2 bg-black rounded-full shadow-[0_0_17px_0px_rgba(163,230,53.1)]">
                <img src={Logo} className="w-full h-auto object-cover" alt="" />
              </div>
            </div>
          </div>
          <ClientLogos />
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
