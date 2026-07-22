import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores([
        "dist",
        "node_modules"
    ]),

    {
        files: [
            "**/*.ts"
        ],

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettier
        ],

        languageOptions: {
            globals: {
                ...globals.node
            },
            sourceType: "module",
            ecmaVersion: "latest"
        },

        plugins: {
            "unused-imports": unusedImports
        },

        rules: {

            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],

            "unused-imports/no-unused-imports": "error",

            "eqeqeq": [
                "error",
                "always"
            ],

            "curly": [
                "error",
                "multi-line"
            ],

            "no-console": "off"
        }
    }
]);