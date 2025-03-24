/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
        news: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        glow: "0 0 15px rgba(147, 197, 253, 0.5)",
      },
      colors: {
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
        accent: "#4299e1",
        gradientBlue: "#60a5fa",
        gradientPurple: "#a855f7",
        gradientPink: "#ec4899",
      },
      backgroundImage: {
        'gradient-news': 'linear-gradient(to right, #60a5fa, #a855f7)',
        'gradient-vote-up': 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.3))',
        'gradient-vote-down': 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.3))',
        'card-overlay': 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
        'gradient-header': 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        gradientX: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'gradient-x': 'gradientX 5s ease infinite',
        'bounce': 'bounce 1s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      transitionProperty: {
        'gradient': 'background-position',
        'shadow': 'box-shadow'
      },
      dropShadow: {
        'glow': '0 0 8px rgba(147, 197, 253, 0.5)',
        'text-glow': '0 0 10px rgba(147, 197, 253, 0.8)'
      }
    },
  },
  plugins: [
    require("preline/plugin"),
    require('@tailwindcss/line-clamp')
  ],
};