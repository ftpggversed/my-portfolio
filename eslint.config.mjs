// This file is the updated ESLint configuration.
// It extends the base Next.js rules and then explicitly disables
// the two specified TypeScript ESLint rules.

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend the default Next.js and TypeScript configurations.
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add custom rules to override or extend the base configurations.
  {
    rules: {
      // Disable the rule that checks for unused variables.
      "@typescript-eslint/no-unused-vars": "off",
      // Disable the rule that disallows the use of namespaces.
      "@typescript-eslint/no-namespace": "off"
    }
  }
];

export default eslintConfig;
