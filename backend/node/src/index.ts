import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/appDataSource";
import { fetchArticleList } from "./external";

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

        // ② API and RSS接続
        console.log("start get api");
        await fetchArticleList();
        console.log("[SYNC] completed");

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