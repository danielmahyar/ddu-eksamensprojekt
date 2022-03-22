/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  theme: {
    extend: {
      colors: {
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
      },
      spacing: {
        '1/1': '100%',
      },
      width: {
        // eslint-disable-next-line prettier/prettier
        '126': '36rem',
      },
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'],
      borderRadius: ['group-hover', 'hover'],
      height: ['group-hover'],
      top: ['group-hover'],
      scale: ['group-hover'],
    },
    variants: {
      // Now you can use nested groups for example in backgroundColor and textColor for hover and focus
      backgroundColor: [
        'responsive',
        'hover',
        'focus',
        'group-hover',
        'group-focus',
      ],
      textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-nested-groups'),
  ],
};
