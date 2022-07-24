module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "plugin:vue/essential",
        'plugin:vue/vue3-recommended',
        "standard",
        'eslint:recommended',
        'prettier'
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
