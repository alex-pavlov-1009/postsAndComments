/* eslint-env node */
module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.d.ts'],
      plugins: [
        '@typescript-eslint',
      ],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:security/recommended-legacy'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      rules: {
        "class-methods-use-this": 'off',
        "no-underscore-dangle": 'off',
        "semi": ["error", "always"],
        "max-len": ["error", { 'code': 150 }],
        "@typescript-eslint/space-before-blocks": 'off',
        "import/prefer-default-export": ['off'],
        "max-classes-per-file": ['off'],
      }
    },
    {
      files: ['tests/**/*.ts'],
      env: {
        jest: true,
        node: true,
      }
    }
  ],
};
