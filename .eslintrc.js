module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jasmine: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  ignorePatterns: ['**/*.css.ts'],
  plugins: ['@typescript-eslint', 'jasmine'],
  // Only adding rules that override the defaults or enforce new standards
  rules: {
    'curly': 'error',
    '@typescript-eslint/no-explicit-any': 'off', // Would LOVE to turn this on
    '@typescript-eslint/no-unused-vars': 'off', // TypeScript is catching this
    '@typescript-eslint/no-use-before-define': 'off', // Lots of complaints in tests.
    'jasmine/no-focused-tests': 'error', // Prevent focused tests
    'no-irregular-whitespace': ['error', { skipTemplates: true }], // Turn of whitespace checking inside of `` templates
  },
};
