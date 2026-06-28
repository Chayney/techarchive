export type Category = {
    id: number;
    name: string;
};

export type Platform = {
    favicon_url: string;
}

export type Article = {
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
}

export type TrendArticle = {
    id: number;
    platform_id: number;
    article_id: number;
    likes_count: number;
    tags: string;
    article: Article;
    platform: Platform;
};

export type FeedArticle = {
    id: number;
    platform_id: number;
    article_id: number;
    tags: string;
    article: Article;
    platform: Platform;
};