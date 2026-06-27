import dotenv from "dotenv";
import { AppDataSource } from "../config/appDataSource";
import { trendArticles } from "./crawler/service/trend.service";
import { feedArticles } from "./crawler/service/feed.service";
import { saveOgps } from "./ogp/repository/article.repository";

dotenv.config();

async function bootstrap() {
    try {
        await AppDataSource.initialize();
        const job = process.argv[2];
        switch (job) {
            case "crawler":
                await trendArticles();
                await feedArticles();
                break;
            case "ogp":
                await saveOgps();
                break;
            case "likes":
                // await updateLikes();
                break;
            case "delete":
                // await deleteArticles();
                break;
            default:
                throw new Error(
                    `unknown batch ${job}`
                );
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

bootstrap();