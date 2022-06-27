/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/resources/*.{js,ts,jsx,tsx}',
    './src/resources/**/*.{js,ts,jsx,tsx}',
    './src/resources/**/*.{scss,module.scss}',
  ],
  theme: {
    fontSize: {
      small: '14px',
      mobile: '16px',
      desktop: '20px',
    },
    screens: {
      small: '370px',
      mobile: '480px',
      tablet: '768px',
      'tablet-lg': '798px',
      desktop: '1025px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#2C2C2C',
      green: '#3BB763',
      blue: '#02A4E0',
      yellow: '#EFCE4A',
    },
    extend: {
      zIndex: {
        '1000': '1000',
      },
    },
  },
  plugins: [],
};
