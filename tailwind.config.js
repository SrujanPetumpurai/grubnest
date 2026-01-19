/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  
      "./src/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
      
      },
      fontFamily:{
        heading:['Poppins','sans-serif'],
        body:['Inter','sans-serif']
      }
    },
  },
  plugins: [],
}

