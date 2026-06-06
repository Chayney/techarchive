import { MigrationDataSource } from "../config/migrationDataSource";

const reset = async () => {
    const dataSource = await MigrationDataSource.initialize();

    try {
        console.log("🧨 Dropping schema...");

        await dataSource.query(`
            DROP SCHEMA public CASCADE;
            CREATE SCHEMA public;
        `);

        console.log("✅ Schema reset complete");
    } finally {
        await dataSource.destroy();
    }
};

reset().catch(console.error);