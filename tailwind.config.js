/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15181B", // formwork black
        charcoal: "#1F2528",
        amber: "#E6B832", // site-marking yellow (name kept so every component picks it up)
        sand: "#EDEFEB", // plaster
        stone: "#586169",
        line: "#C9CEC8",
        forest: "#1F4A3D", // delta green
        mint: "#BCD0C6",
        paper: "#F8F9F6",
      },
      fontFamily: {
        display: ["Archivo", "'Helvetica Neue'", "Arial", "sans-serif"],
        body: ["'Instrument Sans'", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      // Drafted, square-edged look: every radius is tight (circles become soft squares).
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "3px",
        lg: "4px",
        xl: "4px",
        "2xl": "5px",
        "3xl": "6px",
        full: "4px",
      },
    },
  },
  plugins: [],
};
