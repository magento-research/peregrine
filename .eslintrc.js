const config = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['jsx-a11y'],
    extends: ['plugin:jsx-a11y/recommended'],
    rules: {}
};

module.exports = config;
