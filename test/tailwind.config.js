/** @type {import('tailwindcss').Config} */

/* import daisyUI from "daisyui"; */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
    theme: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
  
        md: "768px",
        // => @media (min-width: 768px) { ... }
  
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
  
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
  
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      letterSpacing: {
        widest: ".25em",
      },
      extend: {},
  
      extend: {
        keyframes: {
          fade: {
            "0%": { opacity: "0.5" },
            "100%": { opacity: "1" },
          },
          load: {
            "0%": {
              transform: "scaleX(0)",
              "transform-origin": "0 0",
            },
            "50%": {
              transform: "scaleX(1)",
              "transform-origin": "0 0",
            },
            "51%": {
              "transform-origin": "100% 0",
            },
            "100%": {
              transform: "scaleX(0)",
              "transform-origin": "100% 0",
            },
          },
        },
        animation: {
          fade: "fade 0.75s infinite alternate",
          load: "load 1.5s infinite",
        },
      },
    },
    // daisyui: {
    //   themes: [
    //     {
    //       mytheme: {
    //         primary: "#641ae6",
  
    //         secondary: "#d926a9",
  
    //         accent: "#1fb2a6",
  
    //         neutral: "#f3f4f6",
  
    //         "base-100": "#1d232a",
  
    //         info: "#3abff8",
  
    //         success: "#36d399",
  
    //         warning: "#fbbd23",
  
    //         error: "#f87272",
    //       },
    //     },
    //   ],
    // },
    // plugins: [require("daisyui")],
  };
  