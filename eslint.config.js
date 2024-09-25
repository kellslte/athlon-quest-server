import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node, ecmaVersion: 12 } },
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
    ignores: ["node_modules", "public"]
  },
];
