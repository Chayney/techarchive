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
    updated_at: string;
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