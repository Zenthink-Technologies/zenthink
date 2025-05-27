import Goal1 from "../../assets/goals/goal1.svg";
import Goal2 from "../../assets/goals/goal2.svg";
import Goal3 from "../../assets/goals/goal3.svg";

import Vision from "../../assets/goals/vision.svg";
import Team from "../../assets/goals/team.svg";
import Solution from "../../assets/goals/solution.svg";

const Goals = () => {
  return (
    <>
      <div id="goals" className="w-full max-w-[1440px] mx-auto h-auto py-14">
        <h1 className="text-center text-[50px] font-black leading-[50px] mb-12">
          Key Features to Elevate
          <br />
          Your Business
        </h1>

        <div className="relative w-full flex justify-between items-center px-36">
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
          <div className="w-full flex justify-between items-center space-x-12">
            <div className="w-full mx-auto z-10 flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative w-full h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Goal1} className="mb-20" alt="" />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-20 flex flex-col justify-between items-center">
                  <img src={Vision} alt="" className="w-24 h-24" />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="text-[22px] font-black">
                      Define Objectives
                    </h1>
                    <p className="mt-2 text-[19px] leading-6 opacity-70">
                      Augue maecenas pharetra tempus congue dictum nunc
                      consequat phasellus orci.
                    </p>
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative min-w-[380px] max-relative w-full h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Goal2} className="mb-20" alt="" />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-20 flex flex-col justify-between items-center">
                  <img src={Team} alt="" className="w-24 h-24" />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="text-[22px] font-black">
                      Gather Requirements
                    </h1>
                    <p className="mt-2 text-[19px] leading-6 opacity-70">
                      Sit mattis pellentesque in amet sit. Arcu tortor venenatis
                      libero pellentesque fringilla natoque urna.
                    </p>
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex items-center justify-center transition-all duration-500 ease-in-out">
              <div
                className="relative w-full h-[410px] rounded-lg flex justify-center items-center bg-[#0f0f0f] overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Goal3} className="mb-20" alt="" />

                {/* Contents */}
                <span className="absolute w-full h-full top-0 left-0 px-4 py-20 flex flex-col justify-between items-center">
                  <img src={Solution} alt="" className="w-24 h-24" />

                  {/* Text */}
                  <span className="flex flex-col justify-end items-center text-center space-y-2">
                    <h1 className="text-[22px] font-black">Design Solution</h1>
                    <p className="mt-2 text-[19px] leading-6 opacity-70">
                      Ut nisl purus cras et elit. Adipiscing diam vel feugiat a
                      vestibulum elementum imperdiet.
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
