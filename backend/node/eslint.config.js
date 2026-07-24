import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    // ESLintの対象外にするディレクトリ
    globalIgnores([
        "dist",          // ビルド成果物
        "node_modules"   // インストール済みパッケージ
    ]),

    {
        // TypeScriptファイルのみ対象
        files: [
            "**/*.ts"
        ],

        // ベースとなるルールセット
        extends: [
            // JavaScript推奨ルール
            js.configs.recommended, 
            // TypeScript推奨ルール
            ...tseslint.configs.recommended, 
            // Prettierと競合するルールを無効化
            prettier                         
        ],

        languageOptions: {
            globals: {
                // Node.jsのグローバル変数(require, processなど)を利用可能にする
                ...globals.node
            },

            // ES Modules(import/export)として解析
            sourceType: "module",

            // 最新のECMAScript構文を使用
            ecmaVersion: "latest"
        },

        plugins: {
            // 未使用importを自動検出するプラグイン
            "unused-imports": unusedImports
        },

        rules: {
            // 未使用変数は警告
            // "_"で始まる変数・引数は意図的に未使用として扱う
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ],

            // 未使用のimportはエラー
            // --fixで自動削除可能
            "unused-imports/no-unused-imports": "error",

            // == / != を禁止し、=== / !== を必須にする
            "eqeqeq": [
                "error",
                "always"
            ],

            // 複数行のif/for/whileなどでは {} を必須にする
            // 1行だけなら省略可能
            "curly": [
                "error",
                "multi-line"
            ],

            // console.logなどの使用を許可
            "no-console": "off"
        }
    }
]);