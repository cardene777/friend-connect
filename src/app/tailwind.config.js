/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#01273F",
        textStrong: "#8bd3dd",
      },
      boxShadow: {
        top: "0 -6px 10px -2px rgba(0, 0, 0, 0.2), 0 -4px 6px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
