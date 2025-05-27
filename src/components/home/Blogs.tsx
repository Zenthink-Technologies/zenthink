import Blog1 from "../../assets/blogs/blog1.png";
import Blog2 from "../../assets/blogs/blog2.png";
import Blog3 from "../../assets/blogs/blog3.png";

const Blogs = () => {
  return (
    <>
      <div id="blogs" className="w-full max-w-[1440px] mx-auto h-auto py-14">
        <h1 className="text-center text-[50px] font-black leading-tight mb-12">
          Insights and tips for businesses.
        </h1>

        <div className="flex justify-between items-center space-x-6 px-28 pb-36">
          <div className="relative w-full grid grid-cols-3 items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="relative min-w-[390px] max-w-full h-[500px] rounded-lg bg-white/5 overflow-hidden group transition-all duration-300 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img
                src={Blog1}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                alt=""
              />

              <span
                className="absolute top-5 left-5 bg-black rounded-lg px-4 py-1"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.15)
  `,
                }}
              >
                Resources
              </span>
            </div>
            <span className="absolute top-[104%]">
              <h1 className="text-[23px] font-black leading-7">
                Top Resources for Business Management
              </h1>
              <p className="mt-2 text-[17px] leading-6 opacity-70">
                Sit egestas vitae dignissim adipiscing. Eget volu tpat pharetra
                sollio velit egestas nulla.
              </p>
            </span>
          </div>
          <div className="relative w-full grid grid-cols-3 items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="relative min-w-[390px] max-w-full h-[500px] rounded-lg bg-white/5 overflow-hidden group transition-all duration-300 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img
                src={Blog2}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                alt=""
              />

              <span
                className="absolute top-5 left-5 bg-black rounded-lg px-4 py-1"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.15)
  `,
                }}
              >
                Guides
              </span>
            </div>
            <span className="absolute top-[104%]">
              <h1 className="text-[23px] font-black">
                Your Roadmap to Success
              </h1>
              <p className="mt-2 text-[17px] leading-6 opacity-70">
                Cras turpis diam at suscipit nunc sit tempus in. Libero
                facilisis in volutpat euismod tincidunt orci.
              </p>
            </span>
          </div>
          <div className="relative w-full grid grid-cols-3 items-center justify-center transition-all duration-500 ease-in-out">
            <div
              className="relative min-w-[390px] max-w-full h-[500px] rounded-lg bg-white/5 overflow-hidden group transition-all duration-300 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
              }}
            >
              <img
                src={Blog3}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                alt=""
              />

              <span
                className="absolute top-5 left-5 bg-black rounded-lg px-4 py-1"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.15)
  `,
                }}
              >
                Updates
              </span>
            </div>
            <span className="absolute top-[104%]">
              <h1 className="text-[23px] font-black">
                Latest Updates in ERP Technology
              </h1>
              <p className="mt-2 text-[17px] leading-6 opacity-70">
                Rhoncus tincidunt augue tincidunt nulla faucibus morbi faucibus
                libero. Massa sit commodo.
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
