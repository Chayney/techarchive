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
    thumbnail_url: string;
    favicon_url: Platform;
    tags: string;
    likes_count: number;
    created_at: string;
    updated_at: string;
};