import HeroAbout from "../components/about/HeroAbout";
import Journey from "../components/about/Journey";
import Story from "../components/about/Story";
import Values from "../components/about/Values";

const AboutPage = () => {
  return (
    <>
      <div className="min-w-screen h-auto scroll-smooth">
        <HeroAbout />
        <Journey />
        <Story />
        <Values />
      </div>
    </>
  );
};

export default AboutPage;
