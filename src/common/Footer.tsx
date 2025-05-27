import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <>
      <footer className="pt-10">
        <div className="w-full max-w-[1440px] mx-auto flex justify-between items-start px-32 py-24 border-t-1.5 border-white/15">
          {/* Main text with social icons */}
          <div className="flex flex-col justify-start items-start mb-12">
            <p className="text-[22px] font-medium max-w-[450px]">
              Amanzign individuals around the globe, find a mentor, expand your
              network and learn from incredible people.
            </p>

            {/* Social Icons with Circle Background */}
            <div className="flex space-x-2.5 mt-10">
              <a
                href="/"
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
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
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
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
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
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
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
  `,
                }}
              >
                <Linkedin className="w-5 h-5 text-lime-400" />
              </a>
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-12">
            {/* Company */}
            <div>
              <h3 className="text-[19px] text-white/50 font-bold mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/blogs"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Feature */}
            <div>
              <h3 className="text-[19px] text-white/50 font-bold mb-4">
                Feature
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Feature
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Authentication */}
            <div>
              <h3 className="text-[19px] text-white/50 font-bold mb-4">
                Authentication
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Sign up
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Forgot
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[16px] hover:text-lime-400 font-medium"
                  >
                    Confirm email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Zenthink Logo Faded */}
        <div className="relative w-screen max-w-[1440px] mx-auto">
          <img
            src={Logo}
            className="w-screen max-w-[1440px] mx-auto -mt-36 -mb-10"
            alt=""
          />
          <div className="absolute h-[120px] w-full z-10 bottom-28 left-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Bottom section */}
        <div className="pb-8 w-screen flex justify-center items-center">
          <div className="text-[16px] font-medium text-center text-gray-400 flex justify-center items-center gap-x-1">
            Powered by <span className="text-lime-400">Zenthink</span>
            <b>•</b> Design by
            <span className="text-lime-400">Zenthink</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
