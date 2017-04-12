module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y",
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",  
            "unix",
        ],
        "quotes": [
            "error",
            "single",
        ],
        "semi": [
            "error",
            "never",
        ],
        "react/forbid-elements": [
            1,
            {
                forbid: [
                    'b'
                ]
            }
        ],
        "react/no-danger": 1,
        "react/no-danger-with-children": 1,
        "react/no-deprecated": 1,
        "react/no-direct-mutation-state": 1,
        "react/sort-prop-types": 1,
        "react/style-prop-object": 1,
        "react/void-dom-elements-no-children": 1,
        "react/prop-types": 0,
        "react/jsx-boolean-value": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-closing-bracket-location": 1,
        "react/jsx-equals-spacing": 1,
        "react/jsx-first-prop-new-line": [
            1,
            "multiline-multiprop"
        ],
        "react/jsx-sort-props": [
            1,
            {
                callbacksLast: true,
                shorthandLast: true,
                ignoreCase: false,
                noSortAlphabetically: false,
            }
        ],
        "react/jsx-space-before-closing": 1,
        "react/jsx-indent-props": [
            1,
            2
        ]
    }
};