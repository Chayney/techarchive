import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/appDataSource";
import { trendRouter } from "./routes/trend.route";
import { categoryRouter } from "./routes/category.route";
import { favoriteRouter } from "./routes/favorite.route";
import { feedRouter } from "./routes/feed.route";
import { bookmarkRouter } from "./routes/bookmark.route";
import { folderRouter } from "./routes/folder.route";

dotenv.config();

const app = express();

app.use(cors({
    origin:
        process.env.NODE_ENV === "production"
            ? process.env.FRONTEND_URL
            : process.env.LOCAL_FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

app.use("/api", trendRouter);
app.use("/api", categoryRouter);
app.use("/api", favoriteRouter);
app.use("/api", bookmarkRouter);
app.use("/api", feedRouter);
app.use("/api", folderRouter);

const PORT = process.env.PORT || process.env.LOCAL_PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[SERVER] running on ${PORT}`);
        });
    })
    .catch(console.error);
