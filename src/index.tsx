import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { HeroUIProvider } from "@heroui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </MantineProvider>
  </React.StrictMode>
);
