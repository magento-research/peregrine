module.exports = {
    setupFiles: [
        '<rootDir>/scripts/shim.js',
        '<rootDir>/scripts/fetch-mock.js'
    ],
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/**/__stories__/**',
        '!src/**/__helpers__'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/.*/__tests__/__helpers__/'
    ]
};
