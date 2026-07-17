type QiitaArticle = {
    url: string;
    likes_count: number;
    created_at: Date;
}

type ArticleCreateInput = {
    article_url: string;
    likes_count: number;
    published_at: Date;
}

export const transformQiitaLikesCount = (data: QiitaArticle[]): ArticleCreateInput[] => {
    console.log("[Qiita Transform] start");

    return data.map((item) => ({
        article_url: item.url,
        likes_count: item.likes_count,
        published_at: new Date(item.created_at),
    }));
}