/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/components/Appbar.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",], 
  theme: {
    extend: {
      colors:{
         eggsy:'#801111',
      
      }
    },
  },
  plugins: [],
}

