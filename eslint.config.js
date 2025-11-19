import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  { ignores: [
    "*.config.*", 
    "src/demo/*",
    "test/demo/*"
  ] },
  {
    files: ['**/*.test.js'],
    plugins: { jest },
    languageOptions: {
      globals: {
        ...globals.jest,
        ...jest.environments.globals.globals,
      }
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  {
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",   
    },
    rules: {
      "@stylistic/array-bracket-spacing": "warn",
      "@stylistic/comma-dangle": ["warn", "only-multiline"],
      "@stylistic/indent": ["warn", 2],
      "@stylistic/max-len": [1, 120, 2, { "ignoreComments": true }],
      "@stylistic/no-multi-spaces": ["error", { "ignoreEOLComments": true }],
      "@stylistic/no-trailing-spaces": "warn",
      "@stylistic/padded-blocks": "off",
      "@stylistic/quotes": [2, "single", {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },],
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/space-before-function-paren": "off",
      "camelcase": ["error", { "properties": "always" }],
      "dot-notation": "warn",
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-var": "error",
    },
  },
];