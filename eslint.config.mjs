import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  // Define your language options
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest", // Ensures modern JavaScript support
      sourceType: "module", // Enables ES Module syntax
    },
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      "no-console": "warn",
      "no-multiple-empty-lines": ["error", { max: 1 }],
    },
  },

  pluginJs.configs.recommended,
];
