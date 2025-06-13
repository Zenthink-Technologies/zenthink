import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { X } from "lucide-react";
import Triangle from "../assets/triangle.svg";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
}

interface TabContent {
  title: string;
  description: string;
  features?: {
    name: string;
    path: string;
  }[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isContentHovered, setIsContentHovered] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const contentTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.querySelector("body");

    if (isExpanded || isOpen) {
      bodyRef.current?.classList.add("overflow-hidden");
    } else {
      bodyRef.current?.classList.remove("overflow-hidden");
    }

    return () => {
      bodyRef.current?.classList.remove("overflow-hidden");
    };
  }, [isExpanded, isOpen]);

  // Tab content data
  const tabContents: Record<string, TabContent> = {
    home: {
      title: "Welcome Home",
      description: "Discover our innovative solutions for your business needs",
      features: [
        { name: "Clients", path: "#clients" },
        { name: "Services", path: "#services" },
        { name: "How we do", path: "#how_we_do" },
        { name: "Goals", path: "#goals" },
        { name: "Feedback", path: "#feedback" },
        { name: "Blogs", path: "#blogs" },
      ],
    },
    services: {
      title: "Our Services",
      description:
        "Comprehensive solutions tailored to your business requirements",
      features: [
        { name: "Web & Mobile Development", path: "/services/development" },
        { name: "UI/UX Design", path: "/services/design" },
        { name: "Cloud Solutions", path: "/services/cloud" },
        { name: "DevOps Services", path: "/services/devops" },
      ],
    },
    blogs: {
      title: "Latest Insights",
      description: "Stay updated with industry trends and our perspectives",
      features: [
        { name: "Tech tutorials", path: "/blog/tutorials" },
        { name: "Industry analysis", path: "/blog/analysis" },
        { name: "Case studies", path: "/blog/case-studies" },
        { name: "Product updates", path: "/blog/updates" },
      ],
    },
    about: {
      title: "Our Vision",
      description: "Driving innovation and delivering value to our clients",
      features: [
        { name: "Customer satisfaction", path: "/about/customer-satisfaction" },
        { name: "Technical excellence", path: "/about/technical-excellence" },
        { name: "Sustainable growth", path: "/about/sustainable-growth" },
      ],
    },
    contact: {
      title: "Client Testimonials",
      description: "See what our clients say about working with us",
      features: [
        { name: "Client retention", path: "/contact" },
        { name: "Average rating", path: "/contact/ratings" },
        { name: "Successful projects", path: "/contact/projects" },
      ],
    },
  };

  // Tab routes mapping
  const tabRoutes: Record<string, string> = {
    home: "/",
    services: "/services",
    blogs: "/blogs",
    about: "/about",
    contact: "/contact",
  };

  // Get current active tab from route
  const activeTab = location.pathname.startsWith("/blog/")
    ? "blogs"
    : location.pathname.split("/")[1] || "home";

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
      if (contentTimeout.current) clearTimeout(contentTimeout.current);
    };
  }, []);

  const handleTabEnter = (tabKey: string) => {
    if (contentTimeout.current) clearTimeout(contentTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);

    setIsExpanded(true);
    setIsOpen(false);
    setHoveredTab(tabKey);
  };

  const handleTabLeave = () => {
    contentTimeout.current = setTimeout(() => {
      if (!isContentHovered) {
        setHoveredTab(null);
      }
    }, 100);
  };

  useEffect(() => {
    setIsExpanded(false);
    setHoveredTab(null);
  }, [location.pathname]);

  const handleContentEnter = () => {
    setIsContentHovered(true);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (contentTimeout.current) clearTimeout(contentTimeout.current);
  };

  const handleContentLeave = () => {
    setIsContentHovered(false);
    if (!hoveredTab) {
      contentTimeout.current = setTimeout(() => {
        setHoveredTab(null);
      }, 1000);
    }
    leaveTimeout.current = setTimeout(() => {
      setIsExpanded(false);
    }, 100);
  };

  const handleTabsEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (contentTimeout.current) clearTimeout(contentTimeout.current);
    setIsExpanded(true);
  };

  const handleTabsLeave = () => {
    if (!isContentHovered) {
      leaveTimeout.current = setTimeout(() => {
        setIsExpanded(false);
        setHoveredTab(null);
      }, 100);
    }
  };

  // Particle effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let particles: Particle[] = [];
    const particleCount = 15;
    let width = button.offsetWidth;
    let height = button.offsetHeight;

    const handleResize = () => {
      if (!button) return;
      width = button.offsetWidth;
      height = button.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle absolute rounded-full bg-lime-200/80";
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * width}px`;
      particle.style.top = `${Math.random() * height}px`;
      button.appendChild(particle);
      particles.push({
        element: particle,
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        size: size,
      });
    }

    let animationId: number;
    const animate = () => {
      particles.forEach((particle) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        if (particle.x < -particle.size) particle.x = width + particle.size;
        if (particle.x > width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = height + particle.size;
        if (particle.y > height + particle.size) particle.y = -particle.size;

        if (Math.random() < 0.02) {
          particle.angle += (Math.random() - 0.5) * 0.5;
        }

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.opacity = `${0.7 + Math.random() * 0.3}`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      particles.forEach((p) => {
        if (p.element && p.element.parentNode === button) {
          button.removeChild(p.element);
        }
      });
    };
  }, []);

  // Determine which content to display
  const displayContent = hoveredTab
    ? tabContents[hoveredTab]
    : tabContents[activeTab];

  return (
    <>
      <nav
        className={`pt-6 z-[9999] transition-all duration-500 ease-in-out ${
          isExpanded
            ? location.pathname.startsWith("/blogs")
              ? "pb-16"
              : location.pathname.startsWith("/blog/")
              ? "pb-24"
              : location.pathname.startsWith("/contact")
              ? "pb-16"
              : location.pathname.startsWith("/services")
              ? "pb-24"
              : "pb-10"
            : ""
        }`}
      >
        <div className="flex justify-between items-start w-screen max-w-[1440px] mx-auto h-[50px] md:h-[60px] px-5 md:px-10 lg:px-20 xl:px-24">
          {/* Logo */}
          <div className="fixed px-2 md:relative w-[150px] h-[50px] md:h-[60px] md:w-[200px] lg:w-[160px] xl:w-[200px] bg-black/5 shadow-[0_0_20px_-10px_#a3e635] lg:shadow-[0_0_20px_0px_#000000] rounded-full backdrop-blur-sm lg:backdrop-blur-md lg:h-full flex items-center md:-mt-1 lg:-mt-2">
            <img
              src={logo}
              className="w-full h-auto object-cover"
              alt="Company Logo"
            />
          </div>

          {/* Navigation Links Desktop */}
          <div className="flex-1 hidden lg:flex justify-center items-center">
            <div
              className={`scale-1 md:scale-[0.8] lg:scale-[0.9] xl:scale-[1] relative shadow-[0_0_20px_0px_#000000] transition-all ease-in-out overflow-hidden ${
                isExpanded
                  ? "h-[208px] px-1.5 py-1.5 -mt-1.5 mb-10 rounded-[28px] duration-500"
                  : "h-[52px] rounded-[24px] duration-700"
              } bg-gradient-to-tr from-white/10 to-white/0 backdrop-blur-md bg-opacity-5 shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]`}
              onMouseEnter={handleTabsEnter}
              onMouseLeave={handleTabsLeave}
            >
              <div className="flex gap-1 bg-transparent p-1.5">
                {Object.entries(tabRoutes).map(([key, path]) => (
                  <Link
                    key={key}
                    to={path}
                    className={`w-[90px] flex justify-center items-center py-2.5 h-auto rounded-full relative
                      group transition-all duration-300
                      after:absolute after:bottom-1 after:left-1/2 
                      after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-600
                      overflow-hidden
                      after:opacity-0
                      hover:after:opacity-100
                      before:absolute before:bottom-0 before:left-0 before:right-0
                      before:h-0 before:bg-gradient-to-t
                      before:from-lime-800 before:via-transparent before:to-transparent
                      before:transition-all after:transition-all before:duration-700 after:duration-700 after:ease-in-out before:ease-in-out
                      after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]
                      before:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.25)]
                      hover:before:h-full
                      ${
                        activeTab === key
                          ? "bg-gradient-to-br from-lime-600 to-lime-700 after:opacity-100 " +
                            "after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] " +
                            "shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                          : ""
                      }`}
                    onMouseEnter={() => handleTabEnter(key)}
                    onMouseLeave={handleTabLeave}
                  >
                    <span className="text-white text-[15px] font-semibold relative z-10">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Expanded Content */}
              {displayContent && (
                <div
                  className={`absolute h-[400px] top-12 left-0 right-0 overflow-hidden ${
                    displayContent ? "opacity-100" : "opacity-0"
                  } px-2 pt-4`}
                  onMouseEnter={handleContentEnter}
                  onMouseLeave={handleContentLeave}
                >
                  <div className="bg-white/5 h-[136px] backdrop-blur-lg p-4 rounded-xl rounded-b-[23px] overflow-hidden border border-white/10 shadow-[inset_0_-2px_3px_rgba(255,255,255,0.1)]">
                    <h3 className="text-white text-xl font-black -mb-1">
                      {displayContent.title}
                    </h3>
                    <p className="text-[15px] text-white/80 mb-2">
                      {displayContent.description}
                    </p>
                    {displayContent.features && (
                      <ul className="flex justify-start items-start flex-wrap gap-y-0.5 gap-x-10">
                        {displayContent.features.map((feature, index) => (
                          <li key={index}>
                            <Link
                              to={feature.path}
                              className="group flex items-center text-[15px] text-white hover:text-lime-500 transition-colors duration-200"
                              onClick={(e) => {
                                if (feature.path.startsWith("#")) {
                                  e.preventDefault();
                                  const element = document.querySelector(
                                    feature.path
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }
                              }}
                            >
                              <span className="w-2 h-2 bg-lime-500 group-hover:bg-white rounded-full mr-2" />
                              {feature.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menu Icon */}
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className={`p-2 fixed lg:hidden right-6 top-6 w-[50px] h-[50px] backdrop-blur-sm lg:backdrop-blur-md overflow-hidden space-x-10 flex justify-center items-center focus:outline-none z-50 shadow-[0_0_20px_-10px_#a3e635] hover:shadow-[0_0_20px_-10px_#ffffff] rounded-full transition-all duration-500 ease-linear ${
              isOpen
                ? "shadow-[0_0_20px_-10px_#ffffff] hover:shadow-[0_0_20px_-10px_#a3e635]"
                : ""
            }`}
            aria-label="Toggle menu"
          >
            <img
              src={Triangle}
              className={`min-w-5 min-h-5 max-w-5 max-h-5 transform transition-all duration-500 ease-linear ${
                isOpen
                  ? "-translate-x-3 opacity-0"
                  : "translate-x-[33px] opacity-1"
              }`}
              alt=""
            />
            <X
              className={`min-w-7 min-h-7 max-w-7 max-h-7 transform transition-all duration-500 ease-linear ${
                isOpen
                  ? "-translate-x-[30px] opacity-1"
                  : "translate-x-3 opacity-0"
              }`}
            />
          </button>

          {/* Navigation Links Mobile */}
          <div
            className={`lg:hidden fixed top-0 right-0 flex justify-center items-center h-full transition-all duration-500 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-[65vw]"
            }`}
          >
            <div
              className={`relative transition-all ease-in-out overflow-y-auto h-full w-[65vw] py-10 pt-28 rounded-l-[24px] duration-700 bg-gradient-to-tr from-black/70 to-white/0 backdrop-blur-lg bg-opacity-5 shadow-[0_0_20px_0_#000000,inset_0_-5px_5px_rgba(255,255,255,0.1),_inset_0_1px_2px_rgba(255,255,255,0.2)]`}
              onMouseEnter={handleTabsEnter}
              onMouseLeave={handleTabsLeave}
            >
              <div className="flex flex-col space-y-3 top-0 px-5">
                {Object.entries(tabRoutes).map(([key, path]) => (
                  <Link
                    key={key}
                    to={path}
                    className={`relative w-full flex justify-start pl-7 items-center py-2.5 h-auto rounded-full
                      group transition-all duration-300
                      after:absolute after:bottom-1 after:left-1/2 
                      after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-600
                      overflow-hidden
                      after:opacity-0
                      hover:after:opacity-100
                      before:absolute before:bottom-0 before:left-0 before:right-0
                      before:h-0 before:bg-gradient-to-t
                      before:from-lime-800 before:via-transparent before:to-transparent
                      before:transition-all after:transition-all before:duration-700 after:duration-700 after:ease-in-out before:ease-in-out
                      after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]
                      before:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.25)]
                      hover:before:h-full
                      ${
                        activeTab === key
                          ? "bg-gradient-to-br from-lime-600 to-lime-700 after:opacity-100 " +
                            "after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] " +
                            "shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.2)]"
                          : ""
                      }`}
                    onMouseEnter={() => handleTabEnter(key)}
                    onMouseLeave={handleTabLeave}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-white text-[15px] font-semibold relative z-10">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Expanded Content */}
              {displayContent && (
                <div
                  className={`relative h-auto mt-4 mx-1.5 left-0 right-0 overflow-hidden ${
                    displayContent ? "opacity-100" : "opacity-0"
                  } px-2 pt-4`}
                  onMouseEnter={handleContentEnter}
                  onMouseLeave={handleContentLeave}
                >
                  <div className="bg-white/5 h-auto backdrop-blur-lg p-4 rounded-xl rounded-l-[23px] overflow-hidden border border-white/10 shadow-[inset_0_-2px_3px_rgba(255,255,255,0.1)]">
                    <h3 className="text-white text-xl font-black mb-1">
                      {displayContent.title}
                    </h3>
                    <p className="text-[13px] leading-4 text-justify text-white/80 mb-4">
                      {displayContent.description}
                    </p>
                    {displayContent.features && (
                      <ul className="flex flex-col justify-start items-start flex-wrap gap-y-0.5 gap-x-10">
                        {displayContent.features.map((feature, index) => (
                          <li key={index}>
                            <Link
                              to={feature.path}
                              className="group flex justify-start text-nowrap items-center text-[14px] text-white hover:text-lime-500 transition-colors duration-200"
                              onClick={(e) => {
                                if (feature.path.startsWith("#")) {
                                  e.preventDefault();
                                  const element = document.querySelector(
                                    feature.path
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }
                              }}
                            >
                              <span className="w-2 h-2 bg-lime-500 group-hover:bg-white rounded-full mr-2" />
                              {feature.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hero Button */}
          <div
            className="
              hover:h-[175px]
              hover:scale-[1.02]
              hover:translate-y-[2px]
              hidden lg:flex flex-col justify-start items-center gap-y-3
              scale-1 md:scale-[0.8] lg:scale-[0.9] xl:scale-[1]
              shadow-[0_0_20px_0px_#000000] lg:w-[130px] xl:w-[150px]
              relative px-4 xl:px-0 h-[48px] bg-lime-500 text-white font-extrabold 
              rounded-[24px] border-2 border-lime-400
              transition-all duration-300 ease-linear
              [box-shadow:inset_2px_2px_4px_0_rgba(0,0,0,0.1),inset_-2px_-2px_4px_0_rgba(255,255,255,0.2)]
              hover:[box-shadow:inset_3px_3px_6px_0_rgba(0,0,0,0.2),inset_-3px_-3px_6px_0_rgba(255,255,255,0.3)]
              hover:bg-lime-500/90 active:scale-95
              after:absolute after:bottom-1 after:left-1/2 
              after:-translate-x-1/2 after:w-3 after:h-3
              after:rounded-full
              overflow-hidden
            "
          >
            <span className="z-10 mt-2.5">Our ZenSpart</span>

            {/* Spark elements */}
            <span
              className="
                absolute inset-0 w-full mx-auto 
                before:absolute before:left-8 before:top-2 before:w-1 before:h-1 
                before:bg-lime-200 before:rounded-full before:opacity-0
                before:hover:opacity-100 before:hover:animate-spark-x
                after:absolute after:right-8 after:bottom-2 after:w-1 after:h-1 
                after:bg-lime-200 after:rounded-full after:opacity-0
                after:hover:opacity-100 after:hover:animate-spark-x-reverse
              "
            ></span>

            <div className="bg-black/20 rounded-lg py-4 px-2 text-justify text-[13px] leading-4">
              Our ZenSpark is the love behind every line we write — a spark of
              purpose, passion, and care that drives everything we create.
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
