import ClientLogos from "../../animations/ClientLogos";
import ClientLogosReverse from "../../animations/ClientLogosReverse";
import Logo from "../../assets/favicon.svg";

const LogoSlider = () => {
  return (
    <>
      <div id="clients" className="py-14 w-screen max-w-[1440px] mx-auto">
        <h1 className="text-center text-[30px] font-bold leading-9 w-[400px] mx-auto">
          Empowering businesses with reliable ERP
        </h1>
        <div className="flex justify-center items-center relative">
          <ClientLogosReverse />
          <div className="absolute z-10 min-w-32 h-full bg-black flex justify-center items-center shadow-[0_0_30px_0px_rgba(0,0,0,1)]">
            <div className="absolute z-10 w-20 h-20 flex justify-center items-center bg-black rounded-full backdrop-blur-lg shadow-[0_0_30px_0px_rgba(255,255,255,0.4)]">
              <div className="absolute z-20 w-20 h-20 p-2 bg-black rounded-full shadow-[0_0_17px_0px_rgba(163,230,53.1)]">
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
