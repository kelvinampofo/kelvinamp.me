import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";

const eslintConfig = defineConfig([
  ...nextConfig,
  {
    rules: {
      "import/no-cycle": "error",
      "linebreak-style": ["error", "unix"],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
            orderImportKind: "desc",
          },
          pathGroups: [
            {
              pattern: "**/*.css",
              group: "type",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["type"],
        },
      ],
      "import/default": "off",
      "import/no-named-as-default-member": "off",
      "import/no-named-as-default": "off",
    },
  },
  globalIgnores(["**/node_modules/**", "**/dist/**", "public/", "**/.*"]),
]);

export default eslintConfig;
