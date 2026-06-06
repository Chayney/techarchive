// migration設定
// スキーマ変更専用

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

// nodeディレクトリ直下の.envを参照
// docker用 DB_HOST=postgres
// ホスト用 DB_HOST=localhost
// ホスト用で実行する時はdocker-compose.ymlでのpostgresコンテナをポート公開している必要あり
dotenv.config();

export const MigrationDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_MIGRATION_HOST,
    port: Number(process.env.DB_MIGRATION_PORT),
    username: process.env.DB_MIGRATION_USERNAME,
    password: process.env.DB_MIGRATION_PASSWORD,
    database: process.env.DB_MIGRATION_DATABASE,
    // 作成されるmigrationファイルの場所を指定
    migrations: ['src/database/migrations/**/*.ts'],
    entities: ['src/domain/entity/*.ts'],
    logging: false
});