import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Logo from "../assets/logo_footer.png";

const Footer = () => {
  return (
    <>
      <footer className="pt-10">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-start px-8 md:px-16 lg:px-20 xl:px-32 py-12 lg:py-24 lg:gap-x-10 xl:gap-x-0 border-t-1.5 border-white/15">
          {/* Main text with social icons */}
          <div className="flex flex-col justify-start items-start mb-8 lg:mb-12 w-full lg:w-auto">
            <p className="text-[18px] lg:text-[19px] xl:text-[22px] font-medium max-w-full lg:max-w-[400px] xl:max-w-[450px] mb-6 lg:mb-0">
              We bridge the gap between imagination and implementation, crafting
              bespoke digital experiences and delivering measurable excellence.
            </p>

            {/* Social Icons with Circle Background */}
            <div className="flex space-x-2.5 mt-2 md:mt-6 lg:mt-10">
              <a
                title="/"
                href="/"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                  `,
                }}
              >
                <Twitter className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
              </a>
              <a
                title="/"
                href="/"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                  `,
                }}
              >
                <Facebook className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
              </a>
              <a
                title="/"
                href="/"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                  `,
                }}
              >
                <Instagram className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
              </a>
              <a
                title="/"
                href="/"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.2] transition-all duration-500 ease-in-out"
                style={{
                  boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                    inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                  `,
                }}
              >
                <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 text-lime-400" />
              </a>
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto mt-5 md:mt-8 lg:mt-0">
            {/* Company */}
            <div>
              <h3 className="text-[17px] lg:text-[19px] text-white/50 font-bold mb-3 lg:mb-4">
                Company
              </h3>
              <ul className="space-y-1 lg:space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/blogs"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Feature */}
            <div>
              <h3 className="text-[17px] lg:text-[19px] text-white/50 font-bold mb-3 lg:mb-4">
                Feature
              </h3>
              <ul className="space-y-1 lg:space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Feature
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Authentication */}
            <div>
              <h3 className="text-[17px] lg:text-[19px] text-white/50 font-bold mb-3 lg:mb-4">
                Authentication
              </h3>
              <ul className="space-y-1 lg:space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Sign up
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Forgot
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-[15px] lg:text-[16px] hover:text-lime-400 font-medium"
                  >
                    Confirm email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Zenthink Logo Faded */}
        <div className="relative w-screen max-w-[1440px] mx-auto overflow-hidden -mt-10 md:-mt-20 lg:-mt-32">
          <img src={Logo} className="w-screen max-w-[1440px] mx-auto" alt="" />
        </div>

        {/* Bottom section */}
        <div className="pb-6 lg:pb-8 w-screen flex justify-center items-center">
          <div className="text-[14px] lg:text-[16px] font-medium text-center text-gray-400 flex flex-row justify-center items-center gap-x-1">
            <span>
              Powered by <span className="text-lime-400">Zenthink</span>
            </span>
            <span className="inline">
              <b>•</b>
            </span>
            <span>
              Design by <span className="text-lime-400">Zenthink</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
