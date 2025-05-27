const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mantine/carousel/styles.layer.css",
  ],
  theme: {
    extend: {
      animation: {
        "spark-x": "sparkX 1.5s ease-out infinite",
        "spark-x-reverse": "sparkXReverse 1.5s ease-out infinite",
        shake: "shake 8s infinite ease-in-out",
      },
      keyframes: {
        sparkX: {
          "0%": { transform: "translateX(0) scale(1)", opacity: "0" },
          "50%": { transform: "translateX(10px) scale(1.5)", opacity: "1" },
          "100%": { transform: "translateX(20px) scale(0)", opacity: "0" },
        },
        sparkXReverse: {
          "0%": { transform: "translateX(0) scale(1)", opacity: "0" },
          "50%": { transform: "translateX(-10px) scale(1.5)", opacity: "1" },
          "100%": { transform: "translateX(-20px) scale(0)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-4px, 2px)" },
          "20%": { transform: "translate(3px, -1px)" },
          "30%": { transform: "translate(-2px, 3px)" },
          "40%": { transform: "translate(1px, -2px)" },
          "50%": { transform: "translate(-3px, 1px)" },
          "60%": { transform: "translate(2px, 3px)" },
          "70%": { transform: "translate(-1px, -2px)" },
          "80%": { transform: "translate(3px, 1px)" },
          "90%": { transform: "translate(-2px, -1px)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
