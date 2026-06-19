import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/appDataSource";
import { saveArticles } from "./batch/repository/article.repository";
import { transformQiitaRssArticles } from "./batch/transform/rss/qiitaClient";
import { transformZennRssArticles } from "./batch/transform/rss/zennClient";


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        console.log("[BOOT] starting server...");

        // ① DB接続
        await AppDataSource.initialize();
        console.log("[DB] connected");

        // 記事取得処理
        // OGP取得処理
        // いいね数更新処理
        // この3パターンの処理をコンテナ起動時に引数渡しで切り替えできるようにする

        // ② API and RSS接続(記事取得処理)
        // console.log("start get api");
        await saveArticles();
        // console.log("start get rss");
        console.log("Articles save completed");

        // ③ サーバー起動
        app.listen(PORT, () => {
            console.log(`[SERVER] running on port ${PORT}`);
        });
    } catch (error) {
        console.error("[FATAL] failed to start server:", error);
        process.exit(1);
    }
};

startServer();