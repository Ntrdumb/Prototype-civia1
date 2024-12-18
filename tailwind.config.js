/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"], 
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary1: "#365876", 
		  primary2: "#4e7faa", 
		  primary3: "#faf2f2",
		  background: "var(--background)", 
		  foreground: "var(--foreground)",
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  