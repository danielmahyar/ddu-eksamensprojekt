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
        },






        'discord-dark': {
          DEFAULT: '#202225',
        },

        'discord-btn': {
          DEFAULT: '#4F545C',
        },

        'discord-gray': {
          DEFAULT: '#2F3136',
        },

        'discord-light': {
          DEFAULT: '#36393F',
        },

        'discord-scrollbar-bg': {
          DEFAULT: '#2E3338',
        },

        'discord-user': {
          DEFAULT: '#292B2F',
        },

        'discord-user-offline': {
          DEFAULT: '#747F8D',
        },

        'discord-border': {
          DEFAULT: '#42454A',
        },

        'discord-hover': {
          DEFAULT: '#34373C',
        },

        'discord-active': {
          DEFAULT: '#393C43',
        },

        'discord-text-primary': {
          DEFAULT: '#8E9297',
        },

        'discord-text-highlight': {
          DEFAULT: '#B9BBBE',
        },

        'discord-text-para': {
          DEFAULT: '#D7D6D9',
        },

        'discord-text-secondary': {
          DEFAULT: '#72767D',
        },

        'discord-text-input': {
          DEFAULT: '#40444B',
        },

        'discord-blue': {
          DEFAULT: '#06A2E0',
        },

        'discord-purple': {
          DEFAULT: '#5865F2',
        },

        'discord-red': {
          DEFAULT: '#ED4245',
        },

        'discord-green': {
          DEFAULT: '#3BA55D',
        },
      }
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}