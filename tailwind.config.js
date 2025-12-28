/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  
      "./src/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
         'eggsy':'#801111',
         'darkRed':'#D34A40',
         'itembgcolor':'#F7F8F1'
      
      }
    },
  },
  plugins: [],
}

