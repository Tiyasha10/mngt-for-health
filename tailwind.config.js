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
        'inner-glow': 'inset 0 0 10px rgba(147, 197, 253, 0.3)',
        'depth': '0 10px 30px -10px rgba(0, 0, 0, 0.4)',
      },
      colors: {
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
        accent: "#4299e1",
        gradientBlue: "#60a5fa",
        gradientPurple: "#a855f7",
        gradientPink: "#ec4899",
        neonGreen: "#1dc071",
        deepPurple: "#8c6dfd",
        glass: "rgba(28, 28, 36, 0.8)",
      },
      backgroundImage: {
        'gradient-news': 'linear-gradient(to right, #60a5fa, #a855f7)',
        'gradient-header': 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
        'gradient-vote-up': 'linear-gradient(to bottom right, rgba(25, 200, 113, 0.4), rgba(20, 160, 90, 0.3))',
        'gradient-vote-down': 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.4), rgba(200, 50, 50, 0.3))',
        'card-overlay': 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
        'wellness-gradient': 'linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.2) 0%, transparent 60%)',
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
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'gradient-x': 'gradientX 5s ease infinite',
        'gradient-x-fast': 'gradientX 3s ease infinite',
        'bounce': 'bounce 1s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      transitionProperty: {
        'gradient': 'background-position, background-size',
        'shadow': 'box-shadow, filter',
        'transform': 'transform',
        'backdrop': 'backdrop-filter',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(147, 197, 253, 0.5)',
        'text-glow': '0 0 10px rgba(147, 197, 253, 0.8)',
        'neon': '0 0 15px rgba(25, 200, 113, 0.5)',
        'deep': '0 10px 30px rgba(0, 0, 0, 0.4)',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '110': '1.10',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
      }
    },
  },
  corePlugins: {
    backdropFilter: true,
  },
  plugins: [
    require("preline/plugin"),
    require('@tailwindcss/line-clamp'),
    function({ addUtilities }) {
      addUtilities({
        '.animate-pause': {
          'animation-play-state': 'paused',
        },
        '.animate-running': {
          'animation-play-state': 'running',
        },
        '.will-change-transform': {
          'will-change': 'transform',
        },
        '.glass-effect': {
          '@apply bg-glass backdrop-blur-lg border border-white/10': '',
        },
      })
    }
  ],
};