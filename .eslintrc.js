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
        "prettier",
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
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "react/forbid-elements": [
            2,
            {
                forbid: [
                    'b'
                ]
            }
        ],
        "react/no-danger": 2,
        "react/no-danger-with-children": 2,
        "react/no-deprecated": 2,
        "react/no-direct-mutation-state": 2,
        "react/sort-prop-types": 2,
        "react/style-prop-object": 2,
        "react/void-dom-elements-no-children": 2,
        "react/prop-types": 0,
        "react/jsx-boolean-value": 2,
        "react/jsx-closing-bracket-location": 2,
        "react/jsx-closing-bracket-location": 2,
        "react/jsx-equals-spacing": 2,
        "react/jsx-first-prop-new-line": [
            2,
            "multiline-multiprop"
        ],
        "react/jsx-sort-props": [
            2,
            {
                callbacksLast: true,
                shorthandLast: true,
                ignoreCase: false,
                noSortAlphabetically: false,
            }
        ],
        "react/jsx-space-before-closing": 2,
        "react/jsx-indent-props": [
            2,
            2
        ],
        "jsx-a11y/accessible-emoji": 2,
        "jsx-a11y/anchor-has-content": 2,
        "jsx-a11y/aria-activedescendant-has-tabindex": 2,
        "jsx-a11y/aria-props": 2,
        "jsx-a11y/aria-proptypes": 2,
        "jsx-a11y/aria-role": 2,
        "jsx-a11y/aria-unsupported-elements": 2,
        "jsx-a11y/click-events-have-key-events": 2,
        "jsx-a11y/heading-has-content": 2,
        "jsx-a11y/href-no-hash": 2,
        "jsx-a11y/html-has-lang": 2,
        "jsx-a11y/iframe-has-title": 2,
        "jsx-a11y/img-has-alt": 2,
        "jsx-a11y/img-redundant-alt": 2,
        "jsx-a11y/label-has-for": 2,
        "jsx-a11y/lang": 2,
        "jsx-a11y/mouse-events-have-key-events": 2,
        "jsx-a11y/no-access-key": 2,
        "jsx-a11y/no-autofocus": 2,
        "jsx-a11y/no-distracting-elements": 2,
        "jsx-a11y/no-onchange": 2,
        "jsx-a11y/no-redundant-roles": 2,
        "jsx-a11y/no-static-element-interactions": 2,
        "jsx-a11y/onclick-has-focus": 2,
        "jsx-a11y/role-has-required-aria-props": 2,
        "jsx-a11y/scope": 2,
        "jsx-a11y/tabindex-no-positive": 2,
        "prettier/prettier": [
            "error",
        ],
    }
};