module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  rules: {
    // 'no-console': isProduction ? 'warn' : 'off',
    // 'no-debugger': isProduction ? 'warn' : 'off',
    "no-console": "off",
    "no-debugger": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": ["off"],
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    quotes: [1, "single"],
    semi: [1, "never"],
    indent: [2, 2, { SwitchCase: 1 }],
    // camelcase: [
    //   'error',
    //   {
    //     properties: 'never',
    //     ignoreDestructuring: true,
    //     ignoreImports: true,
    //     allow: ['aa_bb']
    //   }
    // ],
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      // 'warn',
      "off",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/camelcase": ["off", { properties: "never" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
