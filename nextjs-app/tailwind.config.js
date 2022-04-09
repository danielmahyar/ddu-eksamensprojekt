module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          "DEFAULT": "#15314B"
        },
        "secondary": {
          "DEFAULT": "#306FAA"
        },
        "highlight": {
          "DEFAULT": "#FFBF00"
        },
        "background": {
          "DEFAULT": "#F5F5F5"
        },
        "theme-green": {
          "DEFAULT": "#4DAA57"
        },
        "theme-red": {
          "DEFAULT": "#D74E09"
        }
      }
    },
  },
  plugins: [
    require('@kamona/tailwindcss-perspective'),
  ],
}