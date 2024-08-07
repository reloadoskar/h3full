/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  "darkMode": "class",
  theme: {
    extend: {
      backgroundImage: {
        "close-menu": "url('../images/close.svg')",
        "open-menu": "url('../images/navigation.svg')"
      },
    },
  },
  plugins: [],
};
