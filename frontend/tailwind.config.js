module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FBBF24', // Deep Yellow
        secondary: '#F59E0B', // Golden Yellow
        accent: '#FDE047', // Light Yellow
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'], // Clean, modern font
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        pulse: {
          '0%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
          '100%': { opacity: '0.2' },
        },
      },
      boxShadow: {
        'glow': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'xl-glow': '0 8px 12px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
};
