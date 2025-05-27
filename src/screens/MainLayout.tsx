import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <div className="relative min-w-screen min-h-screen scroll-smooth">
      <div
        className={`${
          isAboutPage ? "absolute" : "relative"
        } top-0 left-0 w-full z-50`}
      >
        <Navbar />
      </div>

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
