import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { HeroUIProvider } from "@heroui/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider>
      <HeroUIProvider>
        <App />
        <SpeedInsights />
        <Analytics />
      </HeroUIProvider>
    </MantineProvider>
  </React.StrictMode>
);
