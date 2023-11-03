/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../**/*.{razor,html}'],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
}

