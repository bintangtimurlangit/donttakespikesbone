/** @type {import('tailwindcss').Config} */
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#5D3A0C',
          50: '#FDF8F2',
          100: '#F8E3CB',
          200: '#EEBB7F',
          300: '#E59432',
          400: '#AA6816',
          500: '#5D3A0C',
          600: '#462D09',
          700: '#301F06',
          800: '#191003',
          900: '#030200',
        },
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
      },
      backgroundImage: {
        button: "url('/button.png')",
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-60vw)' },
          '100%': { transform: 'translateX(60vw)' },
        },
        zooming: {
          '0%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.2, 1.2)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
      animation: {
        running: 'wiggle 10s linear infinite',
        zooming: 'zooming 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    ({
      addUtilities, _, theme, variants,
    }) => {
      let colors = flattenColorPalette(theme('borderColor'));
      delete colors.default;

      // Replace or Add custom colors
      if (this.theme?.extend?.colors !== undefined) {
        colors = Object.assign(colors, this.theme.extend.colors);
      }

      const colorMap = Object.keys(colors)
        .map((color) => ({
          [`.border-t-${color}`]: { borderTopColor: colors[color] },
          [`.border-r-${color}`]: { borderRightColor: colors[color] },
          [`.border-b-${color}`]: { borderBottomColor: colors[color] },
          [`.border-l-${color}`]: { borderLeftColor: colors[color] },
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
