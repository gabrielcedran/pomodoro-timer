module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb', 'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    "import/extensions": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/prefer-default-export": [
      ( "off" )
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-uses-react": ["off"],
    "react/require-default-props": ["off"],
    "react/jsx-props-no-spreading"  : ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "jsx-a11y/control-has-associated-label": ["off"],
  },
}
