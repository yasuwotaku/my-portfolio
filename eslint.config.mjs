import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import prettier from "eslint-config-prettier";
import readableTailwind from "eslint-plugin-readable-tailwind";

const flatCompat = new FlatCompat();

const config = [
	...fixupConfigRules(
		flatCompat.extends("next/core-web-vitals"),
		flatCompat.extends("next/typescript")
	),
	prettier,
	{
		rules: {
			"import/no-commonjs": "error",
		},
	},
	{
		files: ["**/*.{jsx,tsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"readable-tailwind": readableTailwind,
		},
		rules: {
			...readableTailwind.configs.warning.rules,
			"readable-tailwind/multiline": [
				"warn",
				{
					group: "newLine",
					indent: "tab",
				},
			],
		},
	},
	{
		files: ["*.config.cjs", "*.config.js"],
		rules: {
			"import/no-commonjs": "off",
		},
	},
];

export default config;
