/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderColor: {
      input: "rgba(76, 176, 80, 0.2)",
    },
    boxShadowColor: {
      form: "rgba(76, 176, 80, 0.2)"
    },
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        '100': '35rem',
      }
    },
  },
  plugins: [],
}

