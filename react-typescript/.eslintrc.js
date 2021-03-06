module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react-hooks'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended'
    ],
    rules: {
        // Indent with 4 spaces
        indent: ['error', 4, { 'SwitchCase': 1 }],
        quotes: [2, 'single'],
        // Trailing spaces not allowed.
        'no-trailing-spaces': [2, { 'skipBlankLines': false }],
        'explicit-module-boundary-types': [0],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        '@typescript-eslint/no-empty-function': [0],
        'react/display-name': [0]
    },
};
