import React, { useEffect, useRef } from "react";
import Client1 from "../assets/favicon.svg";
import Client2 from "../assets/favicon.svg";
import Client3 from "../assets/favicon.svg";
import Client4 from "../assets/favicon.svg";

const icons = [Client1, Client2, Client3, Client4];

const ServiceLogos: React.FC = () => {
  const marqueeRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = parseInt(
      getComputedStyle(root).getPropertyValue("--marquee-elements-displayed")
    );
    const marqueeContent = marqueeRef.current;

    if (marqueeContent) {
      root.style.setProperty("--marquee-elements", `${icons.length}`);

      for (let i = 0; i < marqueeElementsDisplayed; i++) {
        const clone = marqueeContent.children[i].cloneNode(true);
        marqueeContent.appendChild(clone);

        const prependClone =
          marqueeContent.children[icons.length - 1 - i].cloneNode(true);
        marqueeContent.prepend(prependClone);
      }
    }
  }, []);

  return (
    <>
      <div className="marquee-service">
        <ul className="marquee-content-service" ref={marqueeRef}>
          {icons.map((icon, index) => (
            <li
              key={index}
              className="bg-[#0c0c0c] rounded-lg flex justify-center items-center p-1 overflow-hidden"
            >
              <img src={icon} className="rotate-90" alt={`logo-${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ServiceLogos;
