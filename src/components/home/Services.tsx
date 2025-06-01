import Service1 from "../../assets/key.svg";
import Service2 from "../../assets/task.svg";
import LogoSliderService from "../../animations/LogoSliderService";

const Services = () => {
  return (
    <>
      <div
        id="services"
        className="w-full max-w-[1440px] mx-auto h-auto py-10 md:py-12 lg:py-14"
      >
        <h1 className="text-center text-[30px] md:text-[35px] lg:text-[40px] font-black leading-tight mb-10 md:mb-8 lg:mb-12">
          Driving Digital Evolution:
          <br />
          Our Core Services:
        </h1>

        <div className="w-full md:w-[720px] lg:w-full xl:w-[1220px] mx-auto flex flex-col md:flex-row justify-start md:justify-between items-center space-y-32 md:space-y-0 md:space-x-3 lg:space-x-6 px-6 lg:px-20 xl:px-0 pb-20 md:pb-36">
          <div className="relative mx-auto w-full flex items-center justify-center transition-all duration-500 ease-in-out">
            <div className="relative w-full md:grid grid-cols-3 items-center justify-center transition-all duration-500 ease-in-out group overflow-hidden">
              {/* Bg gradient */}
              <div className="absolute w-[150%] h-[150%] top-[-80%] left-[-25%] z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(163,230,53,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
              </div>

              <div
                className="min-w-full md:min-w-[200px] lg:min-w-[260px] xl:min-w-[390px] max-w-full h-[300px] md:h-[280px] lg:h-[360px] xl:h-[460px] rounded-lg bg-white/5"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <LogoSliderService />
              </div>
            </div>
            <span className="absolute top-[104%]">
              <h1 className="md:text-[15px] lg:text-[20px] xl:text-[22px] font-black">
                Seamless Integration
              </h1>
              <p className="lg:mt-1 xl:mt-2 md:text-[13px] lg:text-[15px] xl:text-[19px] md:leading-4 lg:leading-5 xl:leading-6 opacity-70">
                Imperdiet id a turpis ut. Consectetur ultricies nunc viverra
                sed.
              </p>
            </span>
          </div>
          <div className="relative mx-auto w-full flex items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="min-w-full md:min-w-[245px] lg:min-w-[295px] xl:min-w-[390px] max-w-full h-[300px] md:h-[280px] lg:h-[360px] xl:h-[460px] rounded-lg flex justify-center items-center bg-white/5 overflow-hidden"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img src={Service1} alt="" />
            </div>
            <span className="absolute top-[104%]">
              <h1 className="md:text-[15px] lg:text-[20px] xl:text-[22px] font-black">
                Top-Tier Security
              </h1>
              <p className="lg:mt-1 xl:mt-2 md:text-[13px] lg:text-[15px] xl:text-[19px] md:leading-4 lg:leading-5 xl:leading-6 opacity-70">
                Ullamcorper nec et eget pharetra lectus in ac tempor. Habitasse
                etiam est enim id.
              </p>
            </span>
          </div>
          <div className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out group">
            <div className="relative w-full md:grid grid-cols-3 items-center justify-center transition-all duration-500 ease-in-out group overflow-hidden">
              {/* Bg gradient */}
              <div className="absolute w-[150%] h-[150%] bottom-[-80%] left-[-25%] z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(163,230,53,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
              </div>

              <div
                className="min-w-full md:min-w-[200px] lg:min-w-[260px] xl:min-w-[390px] max-w-full h-[300px] md:h-[280px] lg:h-[360px] xl:h-[460px] rounded-lg flex justify-end items-center pl-10 xl:pl-0 bg-white/5 z-10 overflow-hidden"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
                }}
              >
                <img src={Service2} alt="" />
              </div>
            </div>
            <span className="absolute top-[104%]">
              <h1 className="md:text-[15px] lg:text-[20px] xl:text-[22px] font-black">
                Workflow Automation
              </h1>
              <p className="lg:mt-1 xl:mt-2 md:text-[13px] lg:text-[15px] xl:text-[19px] md:leading-4 lg:leading-5 xl:leading-6 opacity-70">
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
