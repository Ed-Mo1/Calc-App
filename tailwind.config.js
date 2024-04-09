/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "indygo-200": "#8C9EFF",
        "calculator-dark": "#202128",
        "calculator-surface": "#262831",
        "btn-dark": "#2B2D35",
        "calculator-light": "#EEEEEE",
        "blue-200": "#90CAF9",
        "blue-400": "#42A5F5",
        "red-200": "#EF9A9A",
        "red-400": "#EF5350",
        "gray-900": "#212121",
      },
    },
  },
  plugins: [],
};
