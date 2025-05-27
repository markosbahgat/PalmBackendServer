import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";

export default [
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "@typescript-eslint": eslintPluginTypeScript,
    },
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...eslintPluginTypeScript.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
];
