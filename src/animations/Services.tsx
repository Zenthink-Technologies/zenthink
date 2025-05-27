import ClientLogos from "../animations/ClientLogos";
import ClientLogosReverse from "../animations/ClientLogosReverse";
import Service1 from "../assets/key.svg";
import Service2 from "../assets/task.svg";

const Services = () => {
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto h-screen py-14">
        <h1 className="text-center text-[40px] font-black leading-tight mb-12">
          Key Features to Elevate
          <br />
          Your Business
        </h1>

        <div className="flex justify-between items-center space-x-6 px-28">
          <div className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="w-full h-[460px] rounded-lg bg-white/5 overflow-hidden"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <ClientLogosReverse />
                <ClientLogos />
              </div>
            </div>
            <span className="absolute -bottom-[110px]">
              <h1 className="text-[22px] font-black">Seamless Integration</h1>
              <p className="mt-2 text-[19px] leading-6 opacity-70">
                Imperdiet id a turpis ut. Consectetur ultricies nunc viverra
                sed.
              </p>
            </span>
          </div>
          <div className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="w-full h-[460px] rounded-lg flex justify-center items-center bg-white/5 overflow-hidden"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img src={Service1} alt="" />
            </div>
            <span className="absolute -bottom-[110px]">
              <h1 className="text-[22px] font-black">Top-Tier Security</h1>
              <p className="mt-2 text-[19px] leading-6 opacity-70">
                Ullamcorper nec et eget pharetra lectus in ac tempor. Habitasse
                etiam est enim id.
              </p>
            </span>
          </div>
          <div className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="w-full h-[460px] rounded-lg flex justify-end items-center bg-white/5 overflow-hidden"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img src={Service2} alt="" />
            </div>
            <span className="absolute -bottom-[110px]">
              <h1 className="text-[22px] font-black">Workflow Automation</h1>
              <p className="mt-2 text-[19px] leading-6 opacity-70">
                Eget sagittis pharetra sodales eros auctor fames id quam.
                Molestie sed eu nisi nunc et ut.
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
