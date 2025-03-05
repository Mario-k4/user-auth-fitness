import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
    js.configs.recommended,
    {
        ignores: [
            '!.*',
            'coverage/',
            '**/node_modules/*',
            'node_modules/',
            'dist/',
            'build/',
            'abydo-client',
            'ng-abydo-client',
            '**/*.d.ts',
            '**/*.spec.ts',
            '__tests__/config/jest.config-int.js',
            'public/**/*'
        ],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                // Node.js Globals
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                global: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                RTCSessionDescriptionInit: 'readonly',
                RTCIceCandidate: 'readonly',

                // Jest Globals
                jest: 'readonly',
                describe: 'readonly',
                test: 'readonly',
                expect: 'readonly',

                // Browser Globals (if needed)
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: pluginPrettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    prettier,
]
