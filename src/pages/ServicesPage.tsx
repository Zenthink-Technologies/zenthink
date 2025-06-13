// import AnimatedServices from "../components/services/AnimatedServices";
import HeroServices from "../components/services/HeroServices";
import ServiceCards from "../components/services/ServiceCards";
// import ServicesList from "../components/services/ServicesList";

const ServicesPage = () => {
  return (
    <>
      <div className="min-w-screen h-auto scroll-smooth">
        {/* <AnimatedServices /> */}
        <HeroServices />
        <ServiceCards />
        {/* <ServicesList /> */}
      </div>
    </>
  );
};

export default ServicesPage;
