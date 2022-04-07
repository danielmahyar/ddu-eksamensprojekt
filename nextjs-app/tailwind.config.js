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
        }
      }
    },
  },
  plugins: [
    require('@kamona/tailwindcss-perspective'),
  ],
}