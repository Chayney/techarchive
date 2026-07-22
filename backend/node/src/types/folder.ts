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

export type FeedTagPlatformGroup = {
    tag: string;
    platform: FeedOptionPlatform;
    articles: FeedOptionArticle[];
};

export type CreateFolderTagPlatformItem = {
    tag: string;
    platform_id: number;
};

export type CreateFolderParams = {
    name: string;
    userId: number;
};

export type CreateFolderTagPlatformsParams = {
    folder_id: number;
    items: CreateFolderTagPlatformItem[];
};

export type UpdateFolderParams = {
    id: number;
    name: string;
    items?: CreateFolderTagPlatformItem[];
};