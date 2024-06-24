/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1B31A8',
        'secondary': '#0079FF',
        'gray': {
          'primary': '#DCDDEC',
          'secondary': '#E9EEF2'
        },
        'background': '#F4F8FA',

      },
    },
  },
  plugins: [],
}
