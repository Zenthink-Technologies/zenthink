import Meet from "../../assets/about/meet.png";

const Story = () => {
  return (
    <>
      <div className="pb-10 md:pb-16 pt-5 md:pt-24 px-6 md:px-20 lg:px-28 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between mx-auto">
          {/* Right Section: Team Image */}
          <div className="flex-1 w-full h-[350px] overflow-hidden rounded-xl shadow-[0_0_20px_5px_rgba(26,46,5,0.5)]">
            <img
              src={Meet}
              alt="Team members"
              className="w-full h-full object-cover saturate-0"
            />
          </div>

          {/* Left Section: Text and Image */}
          <div className="flex-1 flex flex-col justify-between items-start gap-6 h-[350px]">
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
                Our Story
              </div>
              <h1 className="text-[30px] md:text-[40px] xl:text-[50px] font-black text-start mb-4 leading-[32px] md:leading-[40px] xl:leading-[52px]">
                Guiding principles of our company.
              </h1>
              <p className="text-[13px] md:text-[15px] xl:text-[17px] text-white/50 text-start leading-5">
                <span className="inline-flex items-start mb-3">
                  <span className="min-w-2 h-2 bg-lime-500 rounded-full mt-1.5 mr-2"></span>
                  <span className="text-white/50">
                    Every great journey begins with a spark — ours was the
                    unwavering belief that bold ideas deserve to be built. With
                    little more than vision, grit, and a deep-rooted passion for
                    technology, we set out to bridge the gap between imagination
                    and innovation. What began as a handful of dreamers soon
                    transformed into a force driven by purpose — crafting
                    digital experiences that don’t just function, but inspire.
                  </span>
                </span>
                <br />
                <span className="inline-flex items-start">
                  <span className="min-w-2 h-2 bg-lime-500 rounded-full mt-1.5 mr-2"></span>
                  <span className="text-white/50">
                    From the first line of code to the final product launch, our
                    story is written in dedication, resilience, and the
                    relentless pursuit of excellence. And though we’ve come far,
                    we believe the most extraordinary chapters are yet to be
                    written.
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
