import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'tight': '1.25',      // default
        'snug': '1.375',
        'heading': '1.1',     // ← Add this for custom tight heading
      },
      fontFamily: {
        degular: ['Degular', 'system-ui', 'sans-serif'],
      },
      },
        'h1-custom': {
          css: {
            h1: {
              color: '#1A1F2E',
              fontWeight: '800',
              letterSpacing: '-0.025em',
              fontSize: '2.5rem',
              // Add any specific styles you want for h1
            },
          },
        },
        'h3-custom': {
          css: {
            h3: {
              color: '#1A1F2E',
              fontWeight: '700',
              marginTop: '2.5rem',
              // Custom styling for h3
            },
          },
        },
        'p-custom': {
          css: {
            p: {
              color: '#6B7280',
              lineHeight: '1.75',
              fontSize: '1.05rem',
              // Custom paragraph styling
            },
          },
      
    },
  },
  plugins: [],
};

export default config;