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
          dark: "#CC4918"
        },
        success: "#00C853",
        danger: "#FF1744",
        muted: "#8A8B9A",
        border: "#1E1F2A",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'accent-subtle': '0 0 20px rgba(255, 107, 53, 0.12)',
        'accent-glow': '0 0 24px rgba(255, 107, 53, 0.22)',
      },
      borderRadius: {
        'custom': '12px',
      }
    },
  },
  plugins: [],
}
