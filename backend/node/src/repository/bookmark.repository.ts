import { AppDataSource } from "../config/appDataSource";
import { Bookmark } from "../domain/entity/bookmarks.entity";

export const findBookmarkArticles = async (profileId: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);

    try {
        return await repo.find({
            where: {
                profile_id: profileId,
            },
            relations: {
                article: {
                    platform: true,
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find bookmark articles");
    }
};

export const findBookmarkArticle = async (profile_id: number, article_id: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);

    return await repo.findOne({
        where: {
            profile: {
                id: profile_id,
            },
            article: {
                id: article_id,
            },
        },
    });
};

export const saveBookmarkArticle = async (profile_id: number, article_id: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);

    const bookmark = repo.create({
        profile: {
            id: profile_id,
        },
        article: {
            id: article_id,
        },
    });

    return await repo.save(bookmark);
};

export const removeBookmarkArticle = async (bookmark: Bookmark) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);

    return await repo.remove(bookmark);
};
