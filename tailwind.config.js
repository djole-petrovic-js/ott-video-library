/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        duration: 'rgba(0, 0, 0, 0.6)',
        primaryBg: '#111119',
        secondaryBg: '#1e293b',
        primaryButtonBg: '#dc2626',
        primaryButtonTextColor: '#e2e8f0',
      },
    },
  },
  plugins: [],
};
