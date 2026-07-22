import { AppDataSource } from "../config/appDataSource";
import { Feed } from "../domain/entity/feeds.entity";

export const findFeedArticles = async () => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Feed);

    try {
        return await repo.find({
            relations: {
                article: true,
                platform: true,
            },
            order: {
                article: {
                    published_at: "DESC",
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find feed articles");
    }
};