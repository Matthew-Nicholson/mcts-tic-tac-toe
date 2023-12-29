export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "google",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["import"],
  rules: {
    "import/no-unresolved": "error",
    "import/named": "error",
    "import/default": "error",
    "import/no-dynamic-require": "error",
    "import/no-named-as-default": "error",
    "import/order": ["error", { alphabetize: { order: "asc" } }],
    "import/no-cycle": "error",
    "import/newline-after-import": "error",
    "@typescript-eslint/member-ordering": [
      "error",
      { default: ["signature", "method", "constructor", "field"] },
    ],
  },
};
