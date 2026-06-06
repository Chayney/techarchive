// アプリ実行用DB設定
// サーバー起動時やCRUD処理専用
// マイグレーション用とは別

import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

let instance: DataSource;

export const AppDataSource = {
    // 生成のみ
    getInstance: (): DataSource => {
        // instanceがundefindやnullの場合はDB接続設定を定義
        if (!instance) {
            instance = new DataSource({
                type: "postgres",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_CONTAINER_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                // synchronize: true,
                entities: ['src/domain/entity/*.ts'],
                logging: false
            });
        }
        return instance;
    },

    // 初期化を1回だけ行う
    initialize: async () => {
        const dataSource = AppDataSource.getInstance();
        // 2重初期化を防ぐための処理
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return dataSource;
    }
};