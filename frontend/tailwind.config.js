/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", 
          "./screens/**/*.{js,jsx,ts,tsx}", 
          "./navigations/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#0600B4",
      },
      backgroundColor: theme => ({
        ...theme('colors'), // Retain default colors
        'primary': "#0600B4",
      }),
      spacing: {  // Custom padding and margin
        'primary': 15
      },
      flex: {
        '2': 2
      },
      fontSize: {
        "30": 30
      }
    },
  },
  plugins: [],
}