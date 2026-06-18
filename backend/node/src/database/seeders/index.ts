import { MigrationDataSource } from "../../config/migrationDataSource";
import { UserData } from "./users.seed";
import { ProfileData } from "./profiles.seed";
import { PlatformData } from "./platforms.seed";
import { CategoryData } from "./categories.seed";

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

        await CategoryData(dataSource);
        console.log("✔ categories");

        console.log("🎉 ALL SEEDS DONE");
    } catch (err) {
        console.error("❌ Seed failed:", err);
        throw err;
    } finally {
        await dataSource.destroy();
    }
};

run().catch(console.error);