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
    "require-jsdoc": "off",
    "import/no-unresolved": 2,
    "import/named": 2,
    "import/default": 2,
    "import/namespace": 2,
    "import/no-absolute-path": 2,
  },
};
