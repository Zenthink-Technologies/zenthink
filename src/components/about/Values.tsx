import React from "react";
import Lightbulb from "../../assets/about/icons/innovation.svg";
import BadgeCheck from "../../assets/about/icons/quality.svg";
import Scale from "../../assets/about/icons/integrity.svg";
import UserCheck from "../../assets/about/icons/customer.svg";
import Users from "../../assets/about/icons/collaboration.svg";
import Globe from "../../assets/about/icons/accessibility.svg";

const values = [
  {
    title: "Innovation",
    description: "Est mauris et odio cras sed adipiscing tempor aenean donec.",
    icon: Lightbulb,
  },
  {
    title: "Quality",
    description: "It odio cras sed adipiscing tempor aenean donec.",
    icon: BadgeCheck,
  },
  {
    title: "Integrity",
    description: "Tet odio cras sed adipiscing tempor aenean donec.",
    icon: Scale,
  },
  {
    title: "Customer-Centricity",
    description: "Vedio cras sed adipiscing tempor aenean donec.",
    icon: UserCheck,
  },
  {
    title: "Collaboration",
    description: "Febrs et odio cras sed adipiscing tempor aenean donec.",
    icon: Users,
  },
  {
    title: "Accessibility",
    description: "Gets et odio cras sed adipiscing tempor aenean donec.",
    icon: Globe,
  },
];

const Values = () => {
  return (
    <div className="py-10 md:py-16 md:px-20 lg:px-48">
      <h2 className="text-[30px] md:text-[40px] lg:text-[55px] font-semibold text-center leading-[32px] md:leading-[45px] lg:leading-[60px] mb-12">
        Guiding values for our <br />
        success
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {values.map((value, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center gap-4"
          >
            <div
              className="bg-white/5 backdrop-blur-sm p-4 flex justify-center items-center rounded-full"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                  inset 0 1.5px 2px rgba(255, 255, 255, 0.1)
                `,
              }}
            >
              <img src={value.icon} alt={value.title} className="w-8 h-8" />
            </div>
            <h3 className="w-[250px] text-[22px] font-semibold">
              {value.title}
            </h3>
            <p className="w-[250px] text-[17px] leading-5 text-gray-400">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
