import { useEffect } from "react";
import BlogManagement from "./BlogManagement";
import "./style/style.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/admin-zenboard/login");
    }
  }, [navigate]);

  return (
    <div className="w-full max-w-[1440px] mx-auto h-auto pt-16 md:pt-0 py-14 px-4">
      <div className="w-full max-w-[1440px] h-auto mx-auto flex flex-col justify-start items-center">
        <h1 className="text-[60px] md:text-[100px] lg:text-[120px] xl:text-[170px] mt-12 lg:mt-0 text-center font-black uppercase tracking-widest bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-transparent">
          Create Blogs
        </h1>
        <div className="relative h-[30px] lg:h-[35px] xl:h-[40px] -mt-9 md:-mt-10 lg:-mt-16 xl:-mt-24 w-[120px] lg:w-[150px] xl:w-[170px] rounded-[50px] overflow-hidden bg-neutral-900">
          <div className="glow-effect clockwise"></div>
          <div className="glow-effect counter-clockwise"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[11px] md:text-[12px] lg:text-[15px] xl:text-[19px] font-black z-10">
              Update Blogs
            </span>
          </div>
          <div className="absolute inset-[1.5px] rounded-[48px] bg-black/80 z-0"></div>
        </div>

        <h1 className="text-[20px] md:text-[30px] xl:text-[40px] mt-6 text-center font-black uppercase tracking-widest bg-white bg-clip-text text-transparent">
          Showcase Our Impact and
        </h1>
        <h1 className="text-[30px] md:text-[40px] xl:text-[50px] -mt-2 md:-mt-4 lg:-mt-5 text-center font-black uppercase tracking-widest bg-gradient-to-r from-lime-400 to-lime-400/20 bg-clip-text text-transparent">
          Innovation.
        </h1>
      </div>

      <BlogManagement />
    </div>
  );
};

export default Dashboard;
