import { useState, useEffect } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@heroui/react";

const MainLayout = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="relative min-w-screen min-h-screen scroll-smooth">
      <div
        className={`${
          isAboutPage ? "absolute" : "relative"
        } top-0 left-0 w-full z-[9999]`}
      >
        <Navbar />
      </div>

      <div>
        {loading ? (
          <div
            className={`fixed z-50 w-screen h-screen flex items-center justify-center bg-black/50 backdrop-blur-lg ${
              isAboutPage ? "top-0" : "-translate-y-[84px]"
            }`}
          >
            <Spinner color="white" variant="gradient" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
