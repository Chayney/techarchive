// アプリ実行用DB設定
// サーバー起動時やCRUD処理専用
// マイグレーション用とは別

import { DataSource } from "typeorm";

let instance: DataSource;

export const AppDataSource = {
    getInstance: (): DataSource => {
        if (!instance) {
            const isProduction = process.env.NODE_ENV === "production";

            const {
                NODE_ENV,
                DB_HOST,
                DB_PORT,
                POSTGRES_USER,
                POSTGRES_PASSWORD,
                POSTGRES_DB,
            } = process.env;

            // 必須環境変数のチェック
            const missing = [
                ["NODE_ENV", NODE_ENV],
                ["DB_HOST", DB_HOST],
                ["DB_PORT", DB_PORT],
                ["POSTGRES_USER", POSTGRES_USER],
                ["POSTGRES_PASSWORD", POSTGRES_PASSWORD],
                ["POSTGRES_DB", POSTGRES_DB],
            ]
                .filter(([, value]) => !value)
                .map(([key]) => key);

            if (missing.length > 0) {
                throw new Error(
                    `Missing required environment variables: ${missing.join(", ")}`
                );
            }

            instance = new DataSource({
                type: "postgres",
                host: DB_HOST,
                port: Number(DB_PORT),
                username: POSTGRES_USER,
                password: POSTGRES_PASSWORD,
                database: POSTGRES_DB,

                entities: [
                    isProduction
                        ? "dist/domain/entity/*.js"
                        : "src/domain/entity/*.ts",
                ],

                logging: false,

                // Supabase接続時のみSSL
                ssl: isProduction
                    ? {
                        rejectUnauthorized: false,
                    }
                    : false,
            });
        }

        return instance;
    },

    initialize: async () => {
        const dataSource = AppDataSource.getInstance();

        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }

        return dataSource;
    },
};