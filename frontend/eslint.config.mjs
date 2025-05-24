import reactCompiler from "eslint-plugin-react-compiler";

const eslintConfig = [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: await import("@typescript-eslint/parser"),
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"react-compiler": reactCompiler,
		},
		rules: {
			"react-compiler/react-compiler": "error",
		},
	},
];

export default eslintConfig;
