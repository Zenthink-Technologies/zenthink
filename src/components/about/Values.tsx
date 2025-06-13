import React from "react";
import Lightbulb from "../../assets/about/icons/innovation.svg";
import BadgeCheck from "../../assets/about/icons/quality.svg";
import Scale from "../../assets/about/icons/integrity.svg";
import UserCheck from "../../assets/about/icons/customer.svg";
import Users from "../../assets/about/icons/collaboration.svg";
import Globe from "../../assets/about/icons/accessibility.svg";

interface Value {
  title: string;
  description: string;
  icon: string;
}

const values = [
  {
    title: "Discernment",
    description:
      "We think before we build. Every decision is intentional, rooted in clarity — not noise.",
    icon: Lightbulb,
  },
  {
    title: "Dexterity",
    description:
      "We adapt fast, shift smart, and stay in control — no matter how fast the ground moves.",
    icon: BadgeCheck,
  },
  {
    title: "Finesse",
    description:
      "Details aren’t an afterthought. Every interaction is crafted with care and creative precision.",
    icon: Scale,
  },
  {
    title: "Resonance",
    description:
      "Our solutions don’t just work — they connect, deeply and meaningfully, with real users.",
    icon: UserCheck,
  },
  {
    title: "Tenacity",
    description:
      "We don’t stop at friction. We power through with focused energy and relentless intent.",
    icon: Users,
  },
  {
    title: "Equity",
    description:
      "We design for inclusivity and collaborate with empathy — where every voice counts.",
    icon: Globe,
  },
  {
    title: "Synergy",
    description:
      "We win together. When minds align, innovation becomes exponential.",
    icon: Globe,
  },
];

const Values = () => {
  const firstRow = values.slice(0, 3);
  const secondRow = values.slice(3);

  return (
    <div className="py-10 md:py-16 md:px-20 lg:px-48">
      <h2 className="text-[30px] md:text-[40px] lg:text-[55px] font-semibold text-center leading-[32px] md:leading-[45px] lg:leading-[60px] mb-3">
        Guiding values for our <br />
        success
      </h2>
      <p className="w-[90vw] md:w-[600px] lg:w-[700px] xl:w-[800px] mx-auto text-[13px] md:text-[15px] xl:text-[17px] text-white/50 text-center leading-5 mb-12">
        Our core values are not just words — they’re the architecture of how we
        think, build, and grow. Each value reflects the mindset behind every
        decision, design, and delivery.
      </p>

      {/* First row: 3 columns always */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {firstRow.map((value, index) => (
          <ValueCard key={index} value={value} />
        ))}
      </div>

      {/* Second row: 1/2/4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 max-w-6xl mx-auto mt-10">
        {secondRow.map((value, index) => (
          <ValueCard key={index} value={value} />
        ))}
      </div>
    </div>
  );
};

const ValueCard = ({ value }: { value: Value }) => (
  <div className="text-center flex flex-col items-center gap-4">
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
    <h3 className="w-[250px] text-[22px] font-semibold">{value.title}</h3>
    <p className="w-[250px] text-[17px] leading-5 text-gray-400">
      {value.description}
    </p>
  </div>
);

export default Values;
