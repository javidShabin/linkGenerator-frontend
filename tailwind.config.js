/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.97)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
            filter: "blur(6px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.8s ease-out forwards",
        "fade-up": "fade-up 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
