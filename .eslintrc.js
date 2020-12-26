module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'plugin:vue/recommended'
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "vue/html-self-closing": "off",
        "vue/attributes-order": "off",
        "no-multi-spaces": "off",
        "vue/max-attributes-per-line": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-indent": "off",
        "vue/order-in-components": "off"
    }
};
