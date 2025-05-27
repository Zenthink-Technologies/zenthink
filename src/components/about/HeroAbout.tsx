import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { useRef, useEffect } from "react";
// import TimeAndLocation from "../../animations/TimeAndLocation";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
}

const HeroAbout = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
  return (
    <>
      <div className="relative top-0 left-0 w-full max-w-[1440px] max-h-[810px] mx-auto h-screen border-b-[1px] border-lime-400/15 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full h-auto saturate-[150%] object-cover"
        >
          <source
            src={
              "https://previews.customer.envatousercontent.com/h264-video-previews/ddf9b296-d5d2-409f-9936-6aa3b6ab453e/56897660.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="absolute top-40 left-28">
          <a
            href="https://maps.app.goo.gl/K6117GXDuHQJfSCr8"
            target="blank"
            className="group text-[17px] text-white/50 text-start flex justify-start items-center leading-5"
          >
            {/* <TimeAndLocation /> */}
            <p className="w-2 h-2 bg-lime-500 rounded-full mr-2" />{" "}
            Tiruchengodu, Tamil nadu, India.
          </a>
          {/* <p className="text-[17px] text-white/50 text-start leading-5">
          zenthinktechnologies<b className="font-sans">@</b>gmail.com
        </p> */}
        </div>

        {/* Content overlay */}
        <div className="absolute top-56 right-40 w-[470px] h-[280px] rounded-[25px] bg-gradient-to-tr from-white/5 to-white/0 backdrop-blur-sm bg-opacity-5 shadow-[0_0_20px_0px_#000000,inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] flex flex-col items-start justify-between text-start p-6">
          <span className="">
            <h1 className="text-[50px] font-black text-white text-start mb-2 leading-[52px]">
              We make your plans to digital platform
            </h1>
            <p className="text-[17px] text-white/50 text-start leading-5">
              We're dedicated to delivering innovative solutions that transform
              businesses and create lasting impact.
            </p>
          </span>
          <button
            ref={buttonRef}
            className="
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
          >
            View Works
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

        {/* Social Links */}
        <div className="absolute top-[580px] left-28">
          <span className="flex space-x-2.5 mb-5">
            <a
              href="/"
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
  `,
              }}
            >
              <Twitter className="w-5 h-5 text-lime-400" />
            </a>
            <a
              href="/"
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
  `,
              }}
            >
              <Facebook className="w-5 h-5 text-lime-400" />
            </a>
            <a
              href="/"
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
  `,
              }}
            >
              <Instagram className="w-5 h-5 text-lime-400" />
            </a>
            <a
              href="/"
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
  `,
              }}
            >
              <Linkedin className="w-5 h-5 text-lime-400" />
            </a>
          </span>
          <p className="w-[330px] text-[17px] text-white/50 text-start leading-[21px]">
            We're dedicated to delivering innovative solutions that transform
            businesses and create lasting impact.
          </p>
        </div>
      </div>
    </>
  );
};

export default HeroAbout;
