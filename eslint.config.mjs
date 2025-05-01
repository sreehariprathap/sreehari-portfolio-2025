import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Disable Next.js img element warnings in specific components
    // These are better handled with a batch refactor later
    files: [
      "components/sections/Projects/Projects.tsx",
      "components/ui/CareerTimeline.tsx",
      "components/ui/link-preview.tsx"
    ],
    rules: {
      "@next/next/no-img-element": "off"
    }
  },
  {
    // Disable react-hooks/exhaustive-deps warning in following-pointer.tsx
    files: ["components/ui/following-pointer.tsx"],
    rules: {
      "react-hooks/exhaustive-deps": "off"
    }
  },
  {
    // Disable any remaining no-explicit-any warnings in project
    files: ["components/ui/sticky-scroll-reveal.tsx", "lib/performance.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    // Ensure TypeScript unused vars rule is consistent
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }]
    }
  }
];

export default eslintConfig;
