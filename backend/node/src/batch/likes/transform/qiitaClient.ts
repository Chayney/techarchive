import { ArticleCreateInput, QiitaArticle } from "../types";

export const transformQiitaLikesCount = (data: QiitaArticle[]): ArticleCreateInput[] => {
    console.log("[Qiita Transform] start");

    return data.map((item) => ({
        article_url: item.url,
        likes_count: item.likes_count,
        published_at: new Date(item.created_at),
    }));
};
