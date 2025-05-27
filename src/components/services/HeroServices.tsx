import Logo from "../../assets/logo.svg";

const HeroServices = () => {
  return (
    <div className="w-full h-[500px] flex justify-center items-center pt-14 mb-10 relative group">
      {/* Layer 1 - Top */}
      <div className="absolute bg-black border-x-2 border-white/20 scale-[0.9] group-hover:scale-[0.8] shadow-[0_0_20px_0px_#000000] rounded-[30px] w-full h-[230px] flex justify-center items-center z-30 transition-transform duration-700">
        <img src={Logo} className="w-full h-auto object-cover mb-4" alt="" />
      </div>

      {/* Layer 2 */}
      <div className="absolute w-full flex justify-center items-center">
        <div className="absolute scale-[0.8] group-hover:scale-[0.7] mb-[130px] bg-black border-x-2 border-white/20 shadow-[0_0_20px_0px_#000000] rounded-[50px] w-full h-[230px] flex justify-center items-center z-20 transition-transform duration-700 delay-100">
          <img
            src={Logo}
            className="w-full h-auto object-cover mb-4 opacity-75"
            alt=""
          />
        </div>
        <div className="absolute scale-[0.8] group-hover:scale-[0.7] mt-[130px] bg-black border-x-2 border-white/20 shadow-[0_0_20px_0px_#000000] rounded-[50px] w-full h-[230px] flex justify-center items-center z-20 transition-transform duration-700 delay-100">
          <img
            src={Logo}
            className="w-full h-auto object-cover mb-4 opacity-75"
            alt=""
          />
        </div>
      </div>

      {/* Layer 3 */}
      <div className="absolute w-full flex justify-center items-center">
        <div className="absolute scale-[0.7] group-hover:scale-[0.6] mb-[260px] bg-black border-x-2 border-white/20 shadow-[0_0_20px_0px_#000000] rounded-[50px] w-full h-[230px] flex justify-center items-center z-10 transition-transform duration-700 delay-[200ms]">
          <img
            src={Logo}
            className="w-full h-auto object-cover mb-4 opacity-50"
            alt=""
          />
        </div>
        <div className="absolute scale-[0.7] group-hover:scale-[0.6] mt-[260px] bg-black border-x-2 border-white/20 shadow-[0_0_20px_0px_#000000] rounded-[50px] w-full h-[230px] flex justify-center items-center z-10 transition-transform duration-700 delay-[200ms]">
          <img
            src={Logo}
            className="w-full h-auto object-cover mb-4 opacity-50"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroServices;
