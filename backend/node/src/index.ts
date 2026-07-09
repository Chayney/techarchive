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
    const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction)
    const PORT = isProduction ? process.env.PORT : process.env.LOCAL_PORT;
console.log(PORT)
    const FRONTEND_URL = isProduction ? process.env.FRONTEND_URL : process.env.LOCAL_FRONTEND_URL;
    console.log("[BACKEND] FRONTEND_URL:", process.env.FRONTEND_URL);
    try {
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

        await AppDataSource.initialize();

        app.listen(PORT, () => {
            console.log(
                `[SERVER] running on ${PORT}`
            );
        });
    } catch (error) {
        console.error(
            "[SERVER ERROR]",
            error
        );
        process.exit(1);
    }
};

start();