module.exports = {
  important: true,
  purge: ['./src/**/*.stories.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['Karla', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          100: '#3a7fbb',
          200: '#3574ac',
          300: '#306a9c',
          400: '#2b5f8c',
          500: '#26547c',
          600: '#224a6d',
          700: '#1d3f5e',
          800: '#18354e',
          900: '#132a3e',
        },
        secondary: {
          100: '#f7a1b5',
          200: '#f58ea6',
          300: '#f47c98',
          400: '#f26989',
          500: '#ef476f',
          600: '#ed315d',
          700: '#eb1e4e',
          800: '#e11444',
          900: '#ce123e',
        },
        terciary: {
          100: '#ffedc2',
          200: '#ffe7ad',
          300: '#ffe099',
          400: '#ffda85',
          500: '#ffd166',
          600: '#ffc847',
          700: '#ffc233',
          800: '#ffbc1f',
          900: '#ffbc0a',
        },
        black: '#444',
        background: '#fffcf9',
      },
      top: {},
    },
  },
  variants: {},
  plugins: [],
};
