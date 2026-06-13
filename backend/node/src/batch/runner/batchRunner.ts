import { AppDataSource } from "../../config/appDataSource";
import { ogpJob } from "../../batch/jobs/ogp";
import { collectJob } from "../../batch/jobs/collect";

export async function runBatch() {
    console.log("batch start");
    const dataSource = await AppDataSource.initialize();
    try {
        await collectJob(dataSource);
        // await ogpJob(dataSource);

        console.log("batch success");
    } catch (e) {
        console.error("batch error", e);
    } finally {
        await dataSource.destroy();
    }
}