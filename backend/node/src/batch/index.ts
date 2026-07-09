import { AppDataSource } from "../config/appDataSource";
import { feedArticles } from "./crawler/service/feed.service";
import { trendArticles } from "./crawler/service/trend.service";
import { deleteArticles } from "./delete/article";
import { upsertLikesCount } from "./likes/repository/trend.repository";
import { saveOgps } from "./ogp/repository/article.repository";

async function run() {
    await AppDataSource.initialize();

    console.log(
        "Loaded entities:",
        AppDataSource.getInstance()
            .entityMetadatas
            .map((m) => m.name)
    );
    const mode = process.argv[2];

    switch (mode) {
        case "collect":
            console.log("start collect");
            await trendArticles();
            await feedArticles();
            await saveOgps();
            console.log("collect done");
            break;

        case "likes":
            console.log("start likes");
            await upsertLikesCount();
            console.log("likes done");
            break;

        case "delete":
            console.log("start delete");
            await deleteArticles();
            console.log("delete done");
            break;

        default:
            throw new Error(`Unknown mode: ${mode}`);
    }
}

run()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });