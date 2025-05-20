import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customColor: '#020016',
      },
      animation: {
        'float-main': 'float 6s ease-in-out infinite',
        'float-left': 'float-delay 8s ease-in-out infinite',
        'float-right': 'float-reverse 7s ease-in-out infinite',
        'text-glow': 'text-glow 3s ease-in-out infinite',
        'border-glow': 'border-glow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0) rotate(3deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(247, 244, 0, 0.2)' },
          '50%': { textShadow: '0 0 20px rgba(247, 244, 0, 0.5), 0 0 30px rgba(247, 244, 0, 0.3)' },
        },
        'border-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(247, 244, 0, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(247, 244, 0, 0.5), 0 0 30px rgba(247, 244, 0, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;