/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // 自定义主色
        secondary: '#EC4899', // 自定义次色
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // 自定义字体
      },
    },
  },
  plugins: [],
};