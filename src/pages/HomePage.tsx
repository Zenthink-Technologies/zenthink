import HeroHome from "../components/home/HeroHome";
import LogoSlider from "../components/home/LogoSlider";
import Feedback from "../components/home/Feedback";
import Hwd from "../components/home/Hwd";
import Services from "../components/home/Services";
import Blogs from "../components/home/Blogs";
import Goals from "../components/home/Goals";

const HomePage = () => {
  return (
    <>
      <div className="min-w-screen h-auto scroll-smooth">
        <HeroHome />
        <LogoSlider />
        <Services />
        <Hwd />
        <Goals />
        <Feedback />
        <Blogs />
      </div>
    </>
  );
};

export default HomePage;
