import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/appDataSource";
import { trendArticles } from "./batch/crawler/service/trend.service";
import { feedArticles } from "./batch/crawler/service/feed.service";
import { articleRouter } from "./routes/article.route";
import { categoryRouter } from "./routes/category.route";
import { transformQiitaRssOgp } from "./batch/ogp/transform/rss/qiitaClient";
import { transformZennRssOgp } from "./batch/ogp/transform/rss/zennClient";
import { transformQiitaApiOgp } from "./batch/ogp/transform/api/qiitaClient";
import { transformZennApiOgp } from "./batch/ogp/transform/api/zennClient";
import { saveOgps } from "./batch/ogp/repository/article.repository";
import { saveArticles } from "./batch/crawler/repository/article.repository";
import { ogps } from "./batch/ogp/service/articles.service";
import { filteredArticles } from "./batch/likes/service/articles.service";
import { upsertLikesCount } from "./batch/likes/repository/trend.repository";
import { deleteArticles } from "./batch/delete/article";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// DBからデータ取得処理
// app.use("/api", articleRouter);
// app.use("/api", categoryRouter);

// AppDataSource.initialize()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`[SERVER] running on ${PORT}`);
//         });
//     })
//     .catch(console.error);

// バッチ処理
const startServer = async () => {
    try {
        console.log("[BOOT] starting server...");

        // ① DB接続
        await AppDataSource.initialize();
        console.log("[DB] connected");

        // ② この3パターンの処理をコンテナ起動時に引数渡しで切り替えできるようにする
        // 記事取得処理
        // OGP取得処理
        // いいね数更新処理

        // console.log("start get articles");
        // await trendArticles();
        // await feedArticles();
        // console.log("Articles save completed");

        // console.log("start get ogps");
        // await saveOgps();
        // console.log("Ogps save completed");

        // console.log("start get likes");
        // await upsertLikesCount();
        // console.log("Likes save completed");

        // console.log("start delete articles");
        // await deleteArticles();
        // console.log("Articles delete completed");

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