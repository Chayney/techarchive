import { MigrationDataSource } from "../../config/migrationDataSource";

import { UserData } from "./users.seed";
import { ProfileData } from "./profiles.seed";
import { PlatformData } from "./platforms.seed";
import { ArticleData } from "./articles.seed";
import { TrendArticleData } from "./trends.seed";
import { CategoryData } from "./categories.seed";
import { FavoriteArticleData } from "./favorites.seed";
import { BookmarkData } from "./bookmarks.seed";

const run = async () => {
    const dataSource = await MigrationDataSource.initialize();

    try {
        console.log("🌱 Seeding start...");

        await UserData(dataSource);
        console.log("✔ users");

        await ProfileData(dataSource);
        console.log("✔ profiles");

        await PlatformData(dataSource);
        console.log("✔ platforms");

        await ArticleData(dataSource);
        console.log("✔ articles");

        await TrendArticleData(dataSource);
        console.log("✔ trends");

        await CategoryData(dataSource);
        console.log("✔ categories");

        await BookmarkData(dataSource);
        console.log("✔ bookmarks");

        await FavoriteArticleData(dataSource);
        console.log("✔ favorites");

        console.log("🎉 ALL SEEDS DONE");
    } catch (err) {
        console.error("❌ Seed failed:", err);
        throw err;
    } finally {
        await dataSource.destroy();
    }
};

run().catch(console.error);