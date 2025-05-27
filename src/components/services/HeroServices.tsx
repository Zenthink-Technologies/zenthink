import React from "react";

const HeroServices = () => {
  return (
    <>
      <div className="w-full max-w-[1440px] h-auto mx-auto flex flex-col justify-start items-center">
        <h1 className="text-[170px] text-center font-black uppercase tracking-widest bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-transparent">
          Our Services
        </h1>
        <div className="relative h-[40px] -mt-[72px] w-[150px] rounded-[50px] overflow-hidden bg-white/10">
          <div className="glow-effect clockwise"></div>
          <div className="glow-effect counter-clockwise"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[19px] font-black z-10">
              Case Studies
            </span>
          </div>
          <div className="absolute inset-[1.5px] rounded-[48px] bg-black/80 z-0"></div>
        </div>

        <h1 className="text-[40px] mt-6 text-center font-black uppercase tracking-widest bg-white bg-clip-text text-transparent">
          Showcasing Our Impact and
        </h1>
        <h1 className="text-[50px] -mt-5 text-center font-black uppercase tracking-widest bg-gradient-to-r from-lime-400 to-lime-400/20 bg-clip-text text-transparent">
          Innovation.
        </h1>
      </div>
    </>
  );
};

export default HeroServices;
