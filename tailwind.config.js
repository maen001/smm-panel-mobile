/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure all your application directories are explicitly mapped here:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Add these specifically if your folders sit outside the main app structure:
    "./dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
