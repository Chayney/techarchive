type Article = {
    id: number;
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
};

type Platform = {
    id: number;
    name: string;
    favicon_url: string;
};

type Feed = {
    id: number;
    tags: string;
    platform: Platform;
    article: Article;
};

export type TagPlatform = {
    id: number;
    tag: string;
    platform: Platform;
}

export type FolderFeed = {
    id: number;
    folder_id: number;
    feed_id: number;
    tag: string;
    feed: Feed;
};

export type Folder = {
    id: number;
    profile_id: number;
    name: string;
    folderFeeds: FolderFeed[];
};