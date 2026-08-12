/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0C10",
        card: "#15161D",
        elevated: "#1E1F2A",
        accent: {
          DEFAULT: "#FF6B35",
          hover: "#E85A24",
        },
        success: "#00C853",
        danger: "#FF1744",
        warning: "#FFB300",
        muted: "#8A8B9A",
        border: "#1E1F2A",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      fontSize: {
        label: ['11px', { lineHeight: '1', letterSpacing: '0.08em' }],
      }
    },
  },
  plugins: [],
}
