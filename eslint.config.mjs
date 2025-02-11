import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import prettier from "eslint-config-prettier";

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
		overrides: [
			{
				files: ["*.config.cjs", "*.config.js"],
				rules: {
					"import/no-commonjs": "off",
				},
			},
		],
	},
];

export default config;
