/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          inter: ['Inter', 'sans-serif'],
          cascadia: ['Cascadia-Code', 'sans'],
          comic: ['Comic-Sans', 'sans'],
      },
      colors: {
        dark: {
          primary: "#1e1e1e",
          secondary: "#2a2a2a",
          text: "#B85C38"
        }
      }
    }
  }
};