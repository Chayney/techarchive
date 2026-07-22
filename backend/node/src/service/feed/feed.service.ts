import { findFeedArticles } from "../../repository/feed.repository";

export const getFeedArticles = async () => {
    return await findFeedArticles();
};