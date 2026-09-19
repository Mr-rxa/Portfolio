/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0B0D',
        surface: {
          DEFAULT: '#12141A',
          subtle: '#181B22',
          card: '#151820',
          border: '#232730',
        },
        primary: {
          DEFAULT: '#C6FF3D', // Electric Lime
          hover: '#b5f524',
          muted: 'rgba(198, 255, 61, 0.15)',
        },
        signal: {
          orange: '#FF5B1F',
          orangeMuted: 'rgba(255, 91, 31, 0.15)',
        },
        content: {
          DEFAULT: '#EDEAE3', // Off-white
          muted: '#8E95A5',
          faint: '#4A5060',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
