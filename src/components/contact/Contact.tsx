import React, { useEffect, useRef } from "react";
import { PhoneCall, ArrowUpRight, MapPin, Mail } from "lucide-react";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
}

const Contact = () => {
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
    <div className="w-full max-w-[1440px] mx-auto px-28 pt-24 pb-10 flex flex-col md:flex-row gap-16">
      {/* Left section */}
      <div className="flex-1 flex flex-col justify-between items-start">
        <div className="">
          <h2 className="text-[50px] font-black">Contact Us</h2>
          <p className="text-[18px] text-white/50 leading-6 mb-20">
            Team tristique nisl pretium. Purus fames in gravida blandit magna
            imperdiet posuere pellentesque.
          </p>
        </div>

        <div className="w-[400px] space-y-6">
          {/* Card 1 */}
          <div
            className="flex items-center justify-between bg-white/5 p-6 rounded-xl shadow-md"
            style={{
              boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-black/60 rounded-full w-12 h-12 flex justify-center items-center">
                <PhoneCall className="text-lime-500 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Give us call</p>
                <p className="text-white/50 text-[15px] font-sans font-medium">
                  ( +91 ) 99445 00207
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-full w-10 h-10 flex justify-center items-center">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="flex items-center justify-between bg-white/5 p-6 rounded-xl shadow-md"
            style={{
              boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-black/60 rounded-full w-12 h-12 flex justify-center items-center">
                <MapPin className="text-lime-500 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Our Location</p>
                <p className="text-white/50 text-[17px] font-medium">
                  Tiruchengode, tamil nadu, India
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-full w-10 h-10 flex justify-center items-center">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="flex items-center justify-between bg-white/5 p-6 rounded-xl shadow-md"
            style={{
              boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-black/60 rounded-full w-12 h-12 flex justify-center items-center">
                <Mail className="text-lime-500 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">Send us Email</p>
                <p className="text-white/50 text-[17px] font-medium">
                  zenthinktechnologies<b className="font-sans">@</b>gmail.com
                </p>
              </div>
            </div>
            <div className="bg-white/10 rounded-full w-10 h-10 flex justify-center items-center">
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div
        className="flex-1 bg-white/5 p-8 rounded-[30px] shadow-md"
        style={{
          boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
    inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
  `,
        }}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-[17px] font-black mb-2">
              Full name
            </label>
            <input
              type="text"
              placeholder="Ex. Jone Alex"
              className="w-full px-4 py-3 bg-black rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
  `,
              }}
            />
          </div>

          <div>
            <label className="block text-[17px] font-black mb-2">
              Phone number
            </label>
            <input
              type="text"
              placeholder="Ex.(225) 555-0118"
              className="w-full px-4 py-3 bg-black font-sans rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
  `,
              }}
            />
          </div>

          <div>
            <label className="block text-[17px] font-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Ex. jone@example.com"
              className="w-full px-4 py-3 bg-black font-sans rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
  `,
              }}
            />
          </div>

          <div>
            <label className="block text-[17px] font-black mb-2">
              Leave Us a Message
            </label>
            <textarea
              placeholder="Write Your Message here..."
              className="w-full h-[120px] resize-none px-4 py-3 bg-black rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
  `,
              }}
            ></textarea>
          </div>

          <button
            ref={buttonRef}
            type="submit"
            className="
              relative px-6 w-full h-[48px] bg-lime-500 text-white font-extrabold 
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
            <span className="z-10">Submit</span>

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
        </form>
      </div>
    </div>
  );
};

export default Contact;
