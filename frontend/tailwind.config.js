
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "white-clr": "#FBFBF3",
        "black-clr": "#282830",
        "blue-clr": "#2180DE",
        "blueW-clr":"#80D4FF",
        "blueG-clr":"#57D7EC",
      },
      borderRadius: {
        'sm': '2px', // Slightly rounded corners
      },
      
    },
    boxShadow: {
      'custom': '2px 2px 4px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.5)',
    },
    fontFamily: {
      'Potta-One': ['Potta One', 'cursive'],
      'OPTIAuvantGothic-Bold': ['OPTIAuvantGothic-Bold', 'sans-serif'],
      'abeezee': ['ABeeZee', 'sans-serif'],
    },
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
        hover: ['checked'],
      },
    },
  },
  plugins: [],
}



