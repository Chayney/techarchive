import { AppDataSource } from "../../config/appDataSource";
import { ogpJob } from "../jobs/ogp";
import { collectJob } from "../jobs/collect";

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