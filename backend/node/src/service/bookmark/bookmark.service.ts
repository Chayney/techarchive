import {
    findBookmarkArticles,
    findBookmarkArticle,
    saveBookmarkArticle,
    removeBookmarkArticle,
} from "../../repository/bookmark.repository";

export type BookmarkParam = {
    profile_id: number;
    article_id: number;
};

export const getBookmarkArticles = async (profileId: number) => {
    return await findBookmarkArticles(profileId);
};

export const createBookmarkArticle = async ({ profile_id, article_id }: BookmarkParam) => {
    const exists = await findBookmarkArticle(profile_id, article_id);

    if (exists) {
        return null;
    }

    return await saveBookmarkArticle(profile_id, article_id);
};

export const deleteBookmarkArticle = async ({ profile_id, article_id }: BookmarkParam) => {
    const bookmark = await findBookmarkArticle(profile_id, article_id);

    if (!bookmark) {
        return false;
    }

    await removeBookmarkArticle(bookmark);

    return true;
};
