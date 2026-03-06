/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../../apps/**/*.{js,ts,jsx,tsx}",
    "../../ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
      },
    },
  },
  plugins: [],
};
