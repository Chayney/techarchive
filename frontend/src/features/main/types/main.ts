export type Profile = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Platform = {
    favicon_url: string;
}

export type Article = {
    id: number;
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
}

export type BookmarkArticle = {
    id: number;
    article_id: number;
    profile_id: number;
    profile: Profile;
    article: Article
};

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