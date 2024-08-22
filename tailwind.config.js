/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				heading: "var(--heading)",
				sub_heading: "var(--sub-heading)",
				text_primary: "var(--text-primary)",
				text_secondary: "var(--text-secondary)",
				text_tertiary: "var(--text-tertiary)",
				text_accent: "var(--text-accent)",
				background_primary: "var(--bg-color-primary)",
				background_secondary: "var(--bg-color-secondary)",
				background_accent: "var(--bg-accent)",
				border_primary: "var(--border-primary)",
				button_primary: "var(--button-primary)",
				button_hover: "var(--button-hover)",
				button_border: "var(--button-border)",
				button_text: "var(--button-text)",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};
