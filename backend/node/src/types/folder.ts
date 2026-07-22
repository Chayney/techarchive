export type CreateFolderParam = {
    name: string;
    userId: string;
};

// Request用
export type FolderTagPlatformInput = {
    tag: string;
    platform_id: number;
};

// DB登録用
export type FolderTagPlatformItem = FolderTagPlatformInput & {
    folder_id: number;
};

export type CreateFolderTagPlatformsParam = {
    folder_id: number;
    items: FolderTagPlatformInput[];
};

export type UpdateFolderParam = {
    name: string;
    items?: FolderTagPlatformInput[];
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

export type FeedOptionFlatItem = {
    feed_id: number;
    tag: string;
    platform: FeedOptionPlatform;
    article: FeedOptionArticle;
};

export type FeedOptionGroup = {
    tag: string;
    platform: FeedOptionPlatform;
    articles: FeedOptionArticle[];
};