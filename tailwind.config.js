/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pop-purple': '#8B5CF6',
        'pop-yellow': '#FFD500',
        'pop-cyan': '#00E5FF',
        'pop-pink': '#FF477E',
        'pop-lime': '#CCFF00',
        'pop-black': '#18181B', // Ink black
        'pop-white': '#FDFCF8', // Off white
        'pop-gray': '#E4E4E7',
      },
      fontFamily: {
        display: ['"Futura"', '"Futura PT"', '"Futura-Medium"', '"Jost"', '"Outfit"', 'sans-serif'], // Iconic Futura geometric typography
        body: ['"Space Grotesk"', 'sans-serif'], // Quirky readable body
      },
      boxShadow: {
        'pop': '4px 4px 0px 0px #18181B',
        'pop-lg': '8px 8px 0px 0px #18181B',
        'pop-hover': '2px 2px 0px 0px #18181B',
        'pop-glow': '0 0 20px rgba(139, 92, 246, 0.5)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
