import Goal1 from "../../assets/goals/goal1.svg";
import Goal2 from "../../assets/goals/goal2.svg";
import Goal3 from "../../assets/goals/goal3.svg";

import Vision from "../../assets/goals/vision.svg";
import Team from "../../assets/goals/team.svg";
import Solution from "../../assets/goals/solution.svg";

const Goals = () => {
  return (
    <>
      <div
        id="goals"
        className="w-full max-w-[1440px] mx-auto h-auto py-10 md:py-12 lg:py-14"
      >
        <h1 className="text-center text-[30px] md:text-[40px] lg:text-[50px] font-black leading-[30px] md:leading-[40px] lg:leading-[50px] mb-8 md:mb-12">
          Built on Purpose,
          <br />
          Driven by Excellence
        </h1>

        <div className="relative w-full xl:w-[1280px] flex justify-between items-center mx-auto px-8 md:px-24">
          <div className="w-36 z-10 h-full absolute top-0 left-0 bg-gradient-to-r from-black to-transparent"></div>
          {/* Background Line Animation */}
          <div className="absolute z-0 top-1/2 left-0 w-full h-[1.5px] overflow-hidden">
            {/* Static faded line */}
            <div className="absolute inset-0 scale-[2] bg-gradient-to-r from-transparent via-lime-400/30 to-transparent"></div>

            {/* Moving neon with spark */}
            <div className="absolute top-0 left-0 h-full w-[300px] animate-neon-glow">
              {/* Neon core */}
              <div className="absolute inset-y-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-lime-300 to-white/80"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="w-36 z-10 h-full absolute top-0 right-0 bg-gradient-to-l from-black to-transparent"></div>

          {/* Containers */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-10 xl:space-x-12 z-20">
            <div className="w-full flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative w-full h-[260px] md:h-[230px] lg:h-[320px] xl:h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img
                  src={Goal1}
                  className="mb-14 lg:mb-20 w-[60%] md:w-[80%]"
                  alt=""
                />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-8 md:py-12 lg:py-20 flex flex-col justify-start md:justify-between items-center space-y-5">
                  <img
                    src={Vision}
                    alt=""
                    className="w-20 h-20 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24"
                  />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="md:text-[13px] lg:text-[19px] xl:text-[22px] font-black">
                      Our Purpose
                    </h1>
                    <p className="mt-2 md:text-[10px] lg:text-[15px] xl:text-[19px] md:leading-0 lg:leading-5 xl:leading-6 opacity-70">
                      To empower visionary ideas by transforming abstract
                      ambition into purposeful digital realities.
                    </p>
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative w-full h-[260px] lg:min-w-[300px] xl:min-w-[380px] max-relative md:h-[230px] lg:h-[320px] xl:h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Goal2} className="mb-14 lg:mb-20 w-[80%]" alt="" />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-8 md:py-12 lg:py-20 flex flex-col justify-start md:justify-between items-center space-y-5">
                  <img
                    src={Team}
                    alt=""
                    className="w-20 h-20 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24"
                  />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="md:text-[13px] lg:text-[19px] xl:text-[22px] font-black">
                      Our Intention
                    </h1>
                    <p className="mt-2 md:text-[10px] lg:text-[15px] xl:text-[19px] md:leading-0 lg:leading-5 xl:leading-6 opacity-70">
                      We craft every solution with deliberate design, technical
                      precision, and user-centric thinking.
                    </p>
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative w-full h-[260px] md:h-[230px] lg:h-[320px] xl:h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Goal3} className="mb-14 lg:mb-20 w-[80%]" alt="" />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-8 md:py-12 lg:py-20 flex flex-col justify-start md:justify-between items-center space-y-5">
                  <img
                    src={Solution}
                    alt=""
                    className="w-20 h-20 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24"
                  />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="md:text-[13px] lg:text-[19px] xl:text-[22px] font-black">
                      Our Execution
                    </h1>
                    <p className="mt-2 md:text-[10px] lg:text-[15px] xl:text-[19px] md:leading-0 lg:leading-5 xl:leading-6 opacity-70">
                      We deliver scalable, lasting digital outcomes that convert
                      innovation into measurable impact.
                    </p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;
