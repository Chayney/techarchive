// アプリ実行用DB設定
// サーバー起動時やCRUD処理専用
// マイグレーション用とは別

import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

let instance: DataSource;

export const AppDataSource = {

    getInstance: (): DataSource => {

        if (!instance) {

            const isProduction =
                process.env.NODE_ENV === "production";

            instance = new DataSource({

                type: "postgres",

                host: process.env.DB_HOST,

                port: Number(process.env.DB_PORT),

                username: process.env.POSTGRES_USER,

                password: process.env.POSTGRES_PASSWORD,

                database: process.env.POSTGRES_DB,


                entities: [
                    "src/domain/entity/*.ts"
                ],

                logging: false,


                // Supabase接続時のみSSL
                ssl: isProduction
                    ? {
                        rejectUnauthorized: false
                    }
                    : false
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
    }
};