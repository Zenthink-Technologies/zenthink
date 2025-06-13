import DataList from "../../common/DataList";
import DataListMobile from "../../common/DataListMobile";

const HeroHome = () => {
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pb-12">
        <h1 className="dosis text-[35px] sm:text-[60px] lg:text-[90px] font-bold text-center mt-16 sm:mt-20 lg:mt-28 leading-tight">
          Ideas - Digital Platforms
        </h1>
        <p className="dosis text-[13px] sm:text-[20px] lg:text-[25px] font-medium text-center text-white/70 mt-1 md:mt-3 lg:mt-0 sm:mt-6">
          We transform raw ideas into dynamic digital platforms.
        </p>

        <div className="mx-auto w-[80vw] flex justify-center items-center mt-8 space-x-3">
          <button className="hover:opacity-90 bg-gradient-to-tr from-lime-500 via-lime-500/80 to-white/0 backdrop-blur-md rounded-full px-3 sm:px-8 h-[45px] sm:h-[50px] transition-all duration-500 ease-in-out w-full sm:w-auto">
            <span className="dosis text-[10px] sm:text-[16px] font-semibold z-10">
              Ready to digitize your vision
            </span>
          </button>
          {/* <button className="hover:opacity-90 bg-gradient-to-tr from-white/20 to-white/0 backdrop-blur-md rounded-full px-3 sm:px-8 h-[45px] sm:h-[50px] transition-all duration-500 ease-in-out w-full sm:w-auto">
            <span className="dosis text-[10px] sm:text-[16px] font-semibold z-10">
              Become a startup partner
            </span>
          </button> */}
        </div>
      </div>
      <div className="hidden lg:block">
        <DataList />
      </div>
      <div className="lg:hidden">
        <DataListMobile />
      </div>
    </>
  );
};

export default HeroHome;
