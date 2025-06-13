import React, { useEffect, useRef, useState } from "react";
import { PhoneCall, ArrowUpRight, MapPin, Mail } from "lucide-react";

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  angle: number;
  size: number;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const Contact = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update the handleSubmit function in your Contact component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Basic validation
    const { name, phone, email, message } = formData;
    if (!name || !phone || !email || !message) {
      setSubmitStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "https://zenthink-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Server error:", data);
        throw new Error(data.message || "Failed to send message");
      }

      // Success
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-28 pt-12 md:pt-16 lg:pt-24 pb-10 flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
      {/* Left section */}
      <div className="flex-1 flex flex-col md:flex-row lg:flex-col justify-between items-start gap-x-8">
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg md:text-[16px] lg:text-[18px] text-white/50 md:leading-5 lg:leading-6 mb-8 sm:mb-12 md:mb-20">
            Team tristique nisl pretium. Purus fames in gravida blandit magna
            imperdiet posuere pellentesque.
          </p>
        </div>

        <div className="w-full max-w-full lg:max-w-[400px] space-y-4 sm:space-y-5">
          {/* Card 1 */}
          <a
            href="tel:9944500207"
            className="cursor-pointer group flex items-center justify-between bg-white/5 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 ease-in-out"
            style={{
              boxShadow: `
                inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-black/60 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center">
                <PhoneCall className="text-lime-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Give us call
                </p>
                <p className="text-white/50 text-sm sm:text-[15px] font-sans font-medium">
                  ( +91 ) 99445 00207
                </p>
              </div>
            </div>
            <div className="group-hover:scale-[1.05] bg-white/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center transition-all duration-300 ease-in-out">
              <ArrowUpRight className="text-white w-3 h-3 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Card 2 */}
          <a
            href="https://maps.app.goo.gl/K6117GXDuHQJfSCr8"
            target="blank"
            className="cursor-pointer group flex items-center justify-between bg-white/5 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 ease-in-out"
            style={{
              boxShadow: `
                inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-black/60 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center">
                <MapPin className="text-lime-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Our Location
                </p>
                <p className="text-white/50 text-sm sm:text-[17px] font-medium">
                  Tiruchengode, India
                </p>
              </div>
            </div>
            <div className="group-hover:scale-[1.05] bg-white/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center transition-all duration-300 ease-in-out">
              <ArrowUpRight className="text-white w-3 h-3 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Card 3 */}
          <a
            href="mailto:info@zenthink.in"
            className="cursor-pointer group flex items-center justify-between bg-white/5 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md transition-all duration-300 ease-in-out"
            style={{
              boxShadow: `
                inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-black/60 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center">
                <Mail className="text-lime-500 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Send us Email
                </p>
                <p className="text-white/50 text-sm sm:text-[17px] font-medium">
                  info<b className="font-sans">@</b>zenthink.in
                </p>
              </div>
            </div>
            <div className="group-hover:scale-[1.05] bg-white/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center transition-all duration-300 ease-in-out">
              <ArrowUpRight className="text-white w-3 h-3 sm:w-5 sm:h-5" />
            </div>
          </a>
        </div>
      </div>

      {/* Right section */}
      <div
        className="flex-1 bg-white/5 p-5 sm:p-8 rounded-2xl sm:rounded-[30px] shadow-md"
        style={{
          boxShadow: `
            inset 0 -5px 5px rgba(255, 255, 255, 0.01),
            inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[16px] sm:text-[17px] font-black mb-1 sm:mb-2">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex. Jone Alex"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-black text-[12px] md:text-[16px] rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                  inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
                `,
              }}
            />
          </div>

          <div>
            <label className="block text-[16px] sm:text-[17px] font-black mb-1 sm:mb-2">
              Phone number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex.(225) 555-0118"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-black text-[12px] md:text-[16px] font-sans rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                  inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
                `,
              }}
            />
          </div>

          <div>
            <label className="block text-[16px] sm:text-[17px] font-black mb-1 sm:mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex. jone@example.com"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-black text-[12px] md:text-[16px] font-sans rounded-lg shadow-md focus:outline-none focus:border-lime-500"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                  inset 0 1.5px 2px rgba(255, 255, 255, 0.15)
                `,
              }}
            />
          </div>

          <div>
            <label className="block text-[16px] sm:text-[17px] font-black mb-1 sm:mb-2">
              Leave Us a Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write Your Message here..."
              className="w-full h-[100px] sm:h-[120px] resize-none px-3 py-2 sm:px-4 sm:py-3 bg-black text-[12px] md:text-[16px] rounded-lg shadow-md focus:outline-none focus:border-lime-500"
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
            disabled={isSubmitting}
            className="
              relative px-6 w-full h-[40px] sm:h-[48px] bg-lime-500 text-white font-extrabold 
              rounded-full border-2 border-lime-400
              transition-all duration-300 ease-linear
              [box-shadow:inset_2px_2px_4px_0_rgba(0,0,0,0.1),inset_-2px_-2px_4px_0_rgba(255,255,255,0.2)]
              hover:[box-shadow:inset_3px_3px_6px_0_rgba(0,0,0,0.2),inset_-3px_-3px_6px_0_rgba(255,255,255,0.3)]
              hover:bg-lime-500/90 active:scale-95
              after:absolute after:bottom-1 after:left-1/2 
              after:-translate-x-1/2 after:w-3 after:h-3
              after:rounded-full
              overflow-hidden
              text-sm sm:text-base
            "
          >
            <span className="z-10">
              {isSubmitting ? "Sending..." : "Submit"}
            </span>

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

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="text-lime-500 text-center">
              Thank you! We've received your message and will contact you soon.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="text-red-500 text-center">
              Something went wrong. Please try again later.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
