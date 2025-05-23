module.exports = {
    arrowParens: 'always',
    bracketSameLine: true,
    printWidth: 120,
    singleAttributePerLine: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    overrides: [
        {
            files: ['tsconfig*.json'],
            options: {
                parser: 'json',
                trailingComma: 'none',
            },
        },
        {
            files: 'packages/**/angular/**/*.html',
            options: {
                parser: 'angular',
            },
        },
        {
            files: ['.tflint.hcl'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
