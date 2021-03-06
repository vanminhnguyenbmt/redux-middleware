module.exports = {
    extends: [
        "react-app",
        "plugin:jsx-a11y/recommended"
    ],
    plugins: ["jsx-a11y"],
    rules: {
        // Indent with 4 spaces
        indent: ['error', 4, { 'SwitchCase': 1 }],
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],
        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        quotes: [2, "single"],
        // Trailing spaces not allowed.
        "no-trailing-spaces": [2, { "skipBlankLines": false }],
        "jsx-a11y/label-has-associated-control": 0
    },
};
