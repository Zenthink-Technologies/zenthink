import Logo from "../assets/favicon.svg";

const NotFound = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="relative w-[900px] bg-lime-500 shadow-[0_0_200px_0px_rgba(26,46,5,0.5)] overflow-hidden mx-auto rounded-lg h-[300px] flex transform transition-all">
          <h1 className="text-white/20 text-[410px] -mt-[168px] font-sans font-bold">
            404
          </h1>
          {/* Content */}
          <div className="absolute overflow-hidden pl-[400px] w-full h-full bottom-0 right-0 bg-black/20 rounded-lg flex flex-col justify-center items-left">
            <span className="absolute -top-48 left-0 w-[350px] h-[350px] rounded-full bg-gradient-to-b from-black via-black to-black/30"></span>
            <span className="w-[250px] absolute left-16 shadow-[0_0_20px_0px_#000000] rounded-full">
              <img src={Logo} className="w-full h-auto scale-[1.01]" alt="" />
            </span>
            <p className="text-[100px] font-black text-white mb-8 leading-8">
              Oops!
            </p>
            <p className="text-[20px] font-black text-white/50 mb-14 leading-8">
              Sorry, the page you visited does not exist.
            </p>
          </div>

          {/* Name */}
          <div className="absolute bottom-10 right-28 flex justify-center items-start">
            <p className="z-10 text-[22px] font-black text-white/60 mt-10">
              Page Not Found!
            </p>
            <span className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-t from-black via-black to-black/30"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
