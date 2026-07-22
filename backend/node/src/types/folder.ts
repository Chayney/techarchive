export type CreateFolderParam = {
    name: string;
    userId: string;
};


export type FolderTagPlatformItem = {
    folder_id: number;
    tag: string;
    platform_id: number;
};


export type CreateFolderTagPlatformsParam = {
    folder_id: number;
    items: FolderTagPlatformItem[];
};


export type UpdateFolderParam = {
    name: string;
    items?: FolderTagPlatformItem[];
};


export type FeedOptionArticle = {
    id: number;
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
};


export type FeedOptionPlatform = {
    id: number;
    name: string;
    favicon_url: string;
};


export type FeedOptionGroup = {
    tag: string;
    platform: FeedOptionPlatform;
    articles: FeedOptionArticle[];
};