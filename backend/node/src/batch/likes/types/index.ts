export type QiitaArticle = {
    url: string;
    likes_count: number;
    created_at: Date;
};

export type ZennArticle = {
    path: string;
    liked_count: number;
    published_at: Date;
};

export type ZennArticlesResponse = {
    articles: ZennArticle[];
};

export type ArticleCreateInput = {
    article_url: string;
    likes_count: number;
    published_at: Date;
};