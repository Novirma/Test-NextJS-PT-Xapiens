/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#212E5B",
				primaryhover: "#0d1f3F",
				secondary: "#FFFFFF",
				third: "#818cf8",
				hovercolor: "#043858",

				cSidebar: "#41455B", //siderbar
				cCompDashBoard: "#41455B", //siderbar
				tPrimary: "#043858", //text
				bPrimary: "#212E5B", //button background
				bTextPrimary: "#FFFFFF",
				bBorderPrimary: "#8A5E0F", //button border
      },
    },
  },
  plugins: [],
};
