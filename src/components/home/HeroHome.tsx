import DataList from "../../common/DataList";

const HeroHome = () => {
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto pb-12">
        <h1 className="dosis text-[90px] font-bold text-center mt-28">
          Webflow for Startups
        </h1>
        <p className="dosis text-[25px] font-medium text-center text-white/70">
          Accelerate your startup's growth with Webflow.
        </p>

        <div className="mx-auto flex justify-center items-center mt-8 space-x-5">
          <button className="bg-gradient-to-tr from-lime-500 via-lime-500/80 to-white/0 backdrop-blur-md bg-opacity-5 rounded-lg px-6 h-[50px]">
            <span className="dosis font-semibold z-10">
              Apply for the startup discount
            </span>
          </button>
          <button className="bg-gradient-to-tr from-white/20 to-white/0 backdrop-blur-md bg-opacity-5 rounded-lg px-6 h-[50px]">
            <span className="dosis font-semibold z-10">
              Become a startup partner
            </span>
          </button>
        </div>
        <DataList />
      </div>
    </>
  );
};

export default HeroHome;
