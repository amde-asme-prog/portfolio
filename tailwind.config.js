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

				background_primary: "var(--bg-color-container)",
				background_secondary: "var(--bg-color-card)",

				background_body: "var(--bg-color-body)",
				background_header: "var(--bg-header)",
				background_container: "var(--bg-color-container)",
				background_card: "var(--bg-color-card)",
				background_accent: "var(--bg-accent)",

				background_link: "var(--bg-link)",
				background_link_active: "var(--bg-link-active)",
				background_link_hover: "var(--bg-link-hover)",

				text_link: "var(--text-link)",
				text_hover: "var(--text-link-hover)",
				text_active: "var(--text-link-active)",

				border_primary: "var(--border-primary)",
				border_card: "var(--border-card)",

				icon_color: "var(--icon-color)",

				button_primary: "var(--button-background)",
				button_secondary: "var(--button-background)",
				button_hover: "var(--button-hover-background)",
				button_hover_text: "var(--button-hover-text)",
				button_hover_background: "var(--button-hover-background)",
				button_border: "var(--button-border)",
				button_text: "var(--button-text)",

				input_background_color: "var(--input-background-color)",
				input_border_color: "var(--input-border-color)",
				input_text_color: "var(--input-text-color)",
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};
