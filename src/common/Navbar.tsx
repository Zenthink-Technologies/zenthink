import { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isContentHovered, setIsContentHovered] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);
  const contentTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Get current active tab from route
  const activeTab = location.pathname.split("/")[1] || "home";

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
      if (contentTimeout.current) clearTimeout(contentTimeout.current);
    };
  }, []);

  const handleTabEnter = (tabKey: string) => {
    // Clear any pending timeouts
    if (contentTimeout.current) clearTimeout(contentTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);

    setIsExpanded(true);
    setHoveredTab(tabKey);
  };

  const handleTabLeave = () => {
    // Set timeout to revert to active tab after 2 seconds
    contentTimeout.current = setTimeout(() => {
      if (!isContentHovered) {
        setHoveredTab(null);
      }
    }, 100);
  };

  const handleContentEnter = () => {
    setIsContentHovered(true);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (contentTimeout.current) clearTimeout(contentTimeout.current);
  };

  const handleContentLeave = () => {
    setIsContentHovered(false);
    // If no tab is hovered, revert to active tab after delay
    if (!hoveredTab) {
      contentTimeout.current = setTimeout(() => {
        setHoveredTab(null);
      }, 1000);
    }
    // Set timeout to collapse navbar
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
    // Only collapse if not hovering content
    if (!isContentHovered) {
      leaveTimeout.current = setTimeout(() => {
        setIsExpanded(false);
        setHoveredTab(null);
      }, 100);
    }
  };

  // Particle effect code remains the same...
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

    // Create particles
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

    // Animation loop
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
              : location.pathname.startsWith("/contact")
              ? "pb-16"
              : location.pathname.startsWith("/services")
              ? "pb-24"
              : "pb-10"
            : ""
        }`}
      >
        <div className="flex justify-between items-start w-screen max-w-[1440px] mx-auto h-[60px] px-24">
          {/* Logo */}
          <div className="w-[200px] bg-black/5 shadow-[0_0_20px_0px_#000000] rounded-full backdrop-blur-md h-full flex items-center -mt-2">
            <img
              src={logo}
              className="w-full h-auto object-cover"
              alt="Company Logo"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex justify-center items-center">
            <div
              className={`relative shadow-[0_0_20px_0px_#000000] transition-all ease-in-out overflow-hidden ${
                isExpanded
                  ? "h-[208px] px-1.5 py-1.5 -mt-1.5 mb-10 rounded-[28px] duration-500"
                  : "h-[52px] rounded-[24px] duration-700"
              } bg-gradient-to-tr from-white/10 to-white/0 backdrop-blur-md bg-opacity-5 shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]`}
              onMouseEnter={handleTabsEnter}
              onMouseLeave={handleTabsLeave}
            >
              <Tabs
                aria-label="Main navigation"
                color="primary"
                radius="full"
                className="h-auto w-auto"
                classNames={{
                  tabList: "gap-1 bg-transparent p-1.5",
                  tab: `w-[90px] flex justify-center items-center py-2.5 h-auto
    group transition-all duration-300
    after:absolute after:bottom-1 after:left-1/2 
    after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-600
    overflow-hidden
    after:opacity-0 after:transition-opacity
    hover:after:opacity-100
    before:absolute before:bottom-0 before:left-0 before:right-0
    before:h-0 before:bg-gradient-to-t
    before:from-lime-800 before:via-transparent before:to-transparent
    before:transition-all after:transition-all before:duration-700 after:duration-700 after:ease-in-out before:ease-in-out
    after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]
    before:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.25)]
    hover:before:h-full`,
                  cursor:
                    "bg-gradient-to-br from-lime-600 to-lime-700 after:absolute after:bottom-1 after:left-1/2 after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-500 after:opacity-100 after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-500 ease-in-out",
                }}
                selectedKey={activeTab}
                onSelectionChange={(key) => {
                  const routes: Record<string, string> = {
                    home: "/",
                    services: "/services",
                    blogs: "/blogs",
                    about: "/about",
                    contact: "/contact",
                  };
                  navigate(routes[key as string]);
                }}
              >
                <Tab
                  key="home"
                  onMouseEnter={() => handleTabEnter("home")}
                  onMouseLeave={handleTabLeave}
                  title={
                    <div className="relative w-full h-full flex justify-center items-center">
                      <span className="text-white text-[15px] font-semibold relative z-10">
                        Home
                      </span>
                    </div>
                  }
                />
                <Tab
                  key="services"
                  onMouseEnter={() => handleTabEnter("services")}
                  onMouseLeave={handleTabLeave}
                  title={
                    <div className="relative w-full h-full flex justify-center items-center">
                      <span className="text-white text-[15px] font-semibold relative z-10">
                        Services
                      </span>
                    </div>
                  }
                />
                <Tab
                  key="blogs"
                  onMouseEnter={() => handleTabEnter("blogs")}
                  onMouseLeave={handleTabLeave}
                  title={
                    <div className="relative w-full h-full flex justify-center items-center">
                      <span className="text-white text-[15px] font-semibold relative z-10">
                        Blogs
                      </span>
                    </div>
                  }
                />
                <Tab
                  key="about"
                  onMouseEnter={() => handleTabEnter("about")}
                  onMouseLeave={handleTabLeave}
                  title={
                    <div className="relative w-full h-full flex justify-center items-center">
                      <span className="text-white text-[15px] font-semibold relative z-10">
                        About
                      </span>
                    </div>
                  }
                />
                <Tab
                  key="contact"
                  onMouseEnter={() => handleTabEnter("contact")}
                  onMouseLeave={handleTabLeave}
                  title={
                    <div className="relative w-full h-full flex justify-center items-center">
                      <span className="text-white text-[15px] font-semibold relative z-10">
                        Contact
                      </span>
                    </div>
                  }
                />
              </Tabs>

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
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.querySelector(
                                  feature.path
                                );
                                if (element) {
                                  element.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              }}
                              className="group flex items-center text-[15px] text-white hover:text-lime-500 transition-colors duration-200"
                            >
                              <span className="w-2 h-2 bg-lime-500 group-hover:bg-white rounded-full mr-2" />
                              {feature.name}
                            </button>
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
          <button
            ref={buttonRef}
            className="
              shadow-[0_0_20px_0px_#000000]
              relative px-6 h-[48px] bg-lime-500 text-white font-extrabold 
              rounded-full border-2 border-lime-400
              transition-all duration-300 ease-linear
              [box-shadow:inset_2px_2px_4px_0_rgba(0,0,0,0.1),inset_-2px_-2px_4px_0_rgba(255,255,255,0.2)]
              hover:[box-shadow:inset_3px_3px_6px_0_rgba(0,0,0,0.2),inset_-3px_-3px_6px_0_rgba(255,255,255,0.3)]
              hover:bg-lime-500/90 active:scale-95
              after:absolute after:bottom-1 after:left-1/2 
              after:-translate-x-1/2 after:w-3 after:h-3
              after:rounded-full
              overflow-hidden
            "
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#clients");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
          >
            <span className="z-10">Get Started</span>

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
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
