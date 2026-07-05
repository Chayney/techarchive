type Platform = {
    id: number;
    name: string;
    favicon_url: string;
};

type Article = {
    id: number;
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
}

export type MyFeedArticle = {
    article: Article;
    feed: {
        tags: string | null;
        platform: {
            name: string;
            favicon_url: string;
        };
    };
};

export type TagPlatform = {
    id: number;
    tag: string;
    platform: Platform;
    articles: Article[];
}

export type FolderTagPlatform = {
    id: number;
    folder_id: number;
    platform: Platform;
    tag: string;
}

export type Folder = {
    id: number;
    profile_id: number;
    name: string;
    folderTagPlatforms: FolderTagPlatform[];
};