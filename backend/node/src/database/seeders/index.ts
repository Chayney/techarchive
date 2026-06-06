import { DataSource } from "typeorm";
import { MigrationDataSource } from "../../config/migrationDataSource";

import { UserData } from "./users.seed";
import { ProfileData } from "./profiles.seed";
import { PlatformData } from "./platforms.seed";
import { ArticleData } from "./articles.seed";
import { TrendArticleData } from "./trend_articles.seed";
import { CategoryData } from "./categories.seed";
import { FavoriteArticleData } from "./favorite_articles.seed";

const resetDatabase = async (dataSource: DataSource): Promise<void> => {
    console.log("🧨 Resetting database...");

    await dataSource.query(`
        TRUNCATE TABLE 
            trend_articles,
            articles,
            profiles,
            platforms,
            users
        RESTART IDENTITY CASCADE;
    `);

    console.log("✅ Database reset complete");
};

const run = async (): Promise<void> => {
    const dataSource = await MigrationDataSource.initialize();

    try {
        await resetDatabase(dataSource);

        console.log("🌱 Seeding started...");

        await UserData(dataSource);
        await ProfileData(dataSource);
        await PlatformData(dataSource);
        await ArticleData(dataSource);
        await TrendArticleData(dataSource);
        await CategoryData(dataSource);
        await FavoriteArticleData(dataSource);

        console.log("🎉 ALL SEEDS DONE");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ Seed error:", error.message);
            console.error(error.stack);
        } else {
            console.error("❌ Unknown seed error:", error);
        }
    } finally {
        await dataSource.destroy();
    }
};

run().catch((error: unknown) => {
    console.error("❌ Fatal error:", error);
});