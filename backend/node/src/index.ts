import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/appDataSource";
import { trendRouter } from "./routes/trend.route";
import { categoryRouter } from "./routes/category.route";
import { favoriteRouter } from "./routes/favorite.route";
import { feedRouter } from "./routes/feed.route";
import { bookmarkRouter } from "./routes/bookmark.route";
import { folderRouter } from "./routes/folder.route";

export const app = express();

export const start = async () => {
    const PORT =
        process.env.NODE_ENV === "production"
            ? process.env.PORT
            : process.env.LOCAL_PORT;
    const FRONTEND_URL =
        process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : process.env.LOCAL_FRONTEND_URL;

    try {
        // CORS設定
        app.use(cors({
            origin: FRONTEND_URL,
            credentials: true,
        }));

        app.use(express.json());

        app.use("/api", trendRouter);
        app.use("/api", categoryRouter);
        app.use("/api", favoriteRouter);
        app.use("/api", bookmarkRouter);
        app.use("/api", feedRouter);
        app.use("/api", folderRouter);

        AppDataSource.initialize()
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`[SERVER] running on ${PORT}`);
                });
            })
            .catch(console.error);
    } catch (error) {
        console.error('Internal Server Error', error);
    }
};

start();