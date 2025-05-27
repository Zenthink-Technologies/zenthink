import React, { useEffect, useRef } from "react";
import Client1 from "../assets/clients/client1.png";
import Client2 from "../assets/clients/client2.png";
import Client3 from "../assets/clients/client1.png";
import Client4 from "../assets/clients/client4.png";

const icons = [Client1, Client2, Client3, Client4];

const ClientLogos: React.FC = () => {
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
      <div className="marquee">
        <ul className="marquee-content" ref={marqueeRef}>
          {icons.map((icon, index) => (
            <li key={index}>
              <img src={icon} alt={`logo-${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default ClientLogos;
