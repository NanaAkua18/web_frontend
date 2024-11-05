/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',

  ],
  theme: {
    extend: {
      colors: {
          'custom-bg':'#17153B',
          'custom-bg-200':'#2d2a5a',
          'custom-bg-100':'#424072',
          'custom-bg-300':'#191744',
        }
    },
    // colors: {
    //   "app-color": "#2e8b57"
    // },
  },
  plugins: [ 
    // require('@tailwindcss/forms'),
      require('preline/plugin'),],

  variants: {
  extend: {
   visibility: ["group-hover"],
 },
},
darkMode: 'selector',
}