import Team from "../../assets/about/team.png";
import Peoples from "../../assets/about/peoples.png";

const Journey = () => {
  return (
    <>
      <div className="pb-16 pt-16 md:pt-24 px-6 md:px-20 lg:px-28 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between mx-auto">
          {/* Left Section: Text and Image */}
          <div className="flex-1 flex flex-col justify-between items-start gap-6 h-[450px]">
            <div>
              <div
                className="w-[100px] h-[30px] mb-4 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-[1.02] border-l-[1.5px] border-lime-500 transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.1)
  `,
                }}
              >
                Our Journey
              </div>
              <h1 className="text-[30px] md:text-[40px] xl:text-[50px] font-black text-start mb-2 leading-[32px] md:leading-[40px] xl:leading-[52px]">
                Our journey towards business excellence.
              </h1>
              <p className="text-[13px] md:text-[15px] xl:text-[17px] text-white/50 text-start leading-5">
                Through strategic thinking, innovation, and client-focused
                execution, we’ve delivered measurable results.
              </p>
            </div>
            <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-[0_0_200px_0px_rgba(26,46,5,0.5)]">
              <img
                src={Team}
                alt="Hands in collaboration"
                className="w-full h-full object-cover saturate-0"
              />
            </div>
          </div>

          {/* Right Section: Team Image */}
          <div className="flex-1 w-full h-[450px] overflow-hidden rounded-xl shadow-[0_0_20px_5px_rgba(26,46,5,0.5)]">
            <img
              src={Peoples}
              alt="Team members"
              className="w-full h-full object-cover saturate-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Journey;
