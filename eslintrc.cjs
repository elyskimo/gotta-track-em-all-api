const angularTsConfigJson = require('angular/tsconfig.json');
const apiTsConfigJson = require('api/tsconfig.json');
const docTsConfigJson = require('doc/tsconfig.json');
const fs = require('fs');
const path = require('path');

const angularPath = fs.existsSync(path.join(__dirname, 'packages', 'client', 'angular'))
    ? path.join(__dirname, 'packages', 'client', 'angular')
    : path.join(__dirname, 'packages', 'clients', 'angular');
const apiPath = fs.existsSync(path.join(__dirname, 'packages', 'api'))
    ? path.join(__dirname, 'packages', 'api')
    : path.join(__dirname, 'packages', 'apis');
const docPath = fs.existsSync(path.join(__dirname, 'packages', 'doc'))
    ? path.join(__dirname, 'packages', 'doc')
    : path.join(__dirname, 'packages', 'docs');

/**
 * @param {Object} tsconfigJson
 *
 * @returns {string}
 */
function buildRegexForTsConfigPaths(tsconfigJson) {
    if (tsconfigJson.compilerOptions?.paths) {
        const paths = Object.keys(tsconfigJson.compilerOptions.paths).join('|');

        return `^(?!\\.|${paths})`;
    }

    return `^(?!\\.)`;
}

/**
 * @param {Object} options
 * @param {string} options.tsconfigRootDir - Path of directory where tsConfig sits.
 */
function typescriptExtends(options) {
    return {
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            //'plugin:@typescript-eslint/recommended-requiring-type-checking', TODO: slowly integrate this set of rules
            'plugin:prettier/recommended',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 'latest',
            project: 'tsconfig.json',
            sourceType: 'module',
            tsconfigRootDir: options.tsconfigRootDir,
        },
    };
}

const commonRules = {
    'sort-keys': ['error', 'asc', { natural: true }],
};

/**
 * @param {Object} options
 * @param {string | undefined} options.importSortGroupPattern - Pattern used to sort imports.
 * @param {string[]} options.noRestrictedImportsPattern - Pattern used to forbid imports.
 */
function typescriptRules(options) {
    return {
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'explicit',
                    methods: 'explicit',
                    parameterProperties: 'explicit',
                    properties: 'explicit',
                },
            },
        ],
        '@typescript-eslint/interface-name-prefix': ['off'],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    order: 'alphabetically-case-insensitive',
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': ['error'],
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/first': ['error'],
        'import/newline-after-import': ['error'],
        'import/no-duplicates': ['error'],
        'no-restricted-imports': [
            'error',
            {
                patterns: options?.noRestrictedImportsPattern ?? [],
            },
        ],
        'no-return-await': ['error'],
        'padding-line-between-statements': ['error', { blankLine: 'always', next: 'return', prev: '*' }],
        'require-await': ['error'],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [[options.importSortGroupPattern]],
            },
        ],
    };
}

module.exports = {
    env: {
        browser: true,
        es2022: true,
        jest: true,
        node: true,
    },
    ignorePatterns: ['**/dist/', '**/node_modules/', '**/sdk/'],
    plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
    root: true,
    // eslint-disable-next-line sort-keys
    overrides: [
        // add rules for js files
        {
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
            files: ['*.cjs', '*.js', '*.mjs'],
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            rules: {
                ...commonRules,
            },
        },
        // add rules for apis
        {
            ...typescriptExtends({ tsconfigRootDir: apiPath }),
            files: ['packages/api/**/*.{ts,tsx}', 'packages/apis/**/*.{ts,tsx}'],
            rules: {
                ...commonRules,
                ...typescriptRules({
                    importSortGroupPattern: buildRegexForTsConfigPaths(apiTsConfigJson),
                    noRestrictedImportsPattern: ['./*', '../*', '@*/client/*'],
                }),
            },
        },
        // add rules for angular clients
        {
            ...typescriptExtends({ tsconfigRootDir: angularPath }),
            files: ['packages/**/angular/**/*.{ts,tsx}'],
            rules: {
                ...commonRules,
                ...typescriptRules({
                    importSortGroupPattern: buildRegexForTsConfigPaths(angularTsConfigJson),
                    noRestrictedImportsPattern: ['./*', '../*', '@*/api/*'],
                }),
            },
        },
        {
            files: ['packages/**/angular/**/*.ts'],
            extends: ['plugin:@angular-eslint/template/process-inline-templates'],
        },
        {
            files: ['packages/**/angular/**/src/**/*.html'],
            parser: '@angular-eslint/template-parser',
            extends: ['plugin:@angular-eslint/template/recommended', 'plugin:prettier/recommended'],
            rules: {
                '@angular-eslint/template/attributes-order': ['error', { alphabetical: true }],
            },
        },
        {
            // filter on component.html to exclude index.html as it should be a valid HTML and self-closing is not
            files: ['*.component.html'],
            rules: {
                '@angular-eslint/template/prefer-self-closing-tags': ['error'],
            },
        },
        // add rules for docs
        {
            ...typescriptExtends({ tsconfigRootDir: docPath }),
            files: ['packages/doc/**/*.{ts,tsx}', 'packages/docs/**/*.{ts,tsx}'],
            rules: {
                ...commonRules,
                ...typescriptRules({
                    importSortGroupPattern: buildRegexForTsConfigPaths(docTsConfigJson),
                    noRestrictedImportsPattern: ['./*', '../*', '@*/api/*', '@*/client/*'],
                }),
            },
        },
    ],
};
