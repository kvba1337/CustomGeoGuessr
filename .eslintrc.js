module.exports = {
  extends: [
    "react-app",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "jsx-a11y", "import", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "off",
    "react/prop-types": "off",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [
          ["@components", "./src/components"],
          ["@pages", "./src/pages"],
          ["@assets", "./src/assets"],
          ["@redux", "./src/redux"],
          ["@hooks", "./src/hooks"],
          ["@utils", "./src/utils"],
          ["@services", "./src/services"],
          ["@constants", "./src/constants"],
          ["@styles", "./src/styles"],
        ],
        extensions: [".js", ".jsx", ".json"],
      },
    },
  },
}
