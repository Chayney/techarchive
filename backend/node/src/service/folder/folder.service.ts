import { FeedTagPlatformGroup, UpdateFolderParams } from "../../types/folder";
import {
    getFeedRepositoryData,
    getFolderTagPlatformArticles,
    findProfile,
    saveFolder,
    saveFolderTagPlatforms,
    findFolders,
    findFolder,
    updateFolderData,
    deleteFolderTags,
    deleteFolderData,
} from "../../repository/folder.repository";

const normalizeTag = (tag: string) => {
    const map: Record<string, string> = {
        react: "React",
        reactjs: "React",
        "next.js": "Next.js",
        nextjs: "Next.js",
        typescript: "TypeScript",
        ts: "TypeScript",
        javascript: "JavaScript",
        js: "JavaScript",
        aws: "AWS",
        gcp: "GCP",
        linux: "Linux",
    };

    const value = tag.trim();

    return map[value.toLowerCase()] ?? value;
};

export const getFeedOptions = async (): Promise<FeedTagPlatformGroup[]> => {
    const feeds = await getFeedRepositoryData();

    const flat = feeds.flatMap((feed) => {
        if (!feed.tags) {
            return [];
        }

        const tags = [...new Set(feed.tags.split(",").map(normalizeTag).filter(Boolean))];

        return tags.map((tag) => ({
            tag,
            platform: {
                id: feed.platform.id,
                name: feed.platform.name,
                favicon_url: feed.platform.favicon_url,
            },
            article: {
                id: feed.article.id,
                title: feed.article.title,
                article_url: feed.article.article_url,
                thumbnail_url: feed.article.thumbnail_url,
                published_at: feed.article.published_at,
            },
        }));
    });

    const grouped = flat.reduce<Record<string, FeedTagPlatformGroup>>((acc, cur) => {
        const key = `${cur.tag}__${cur.platform.name}`;

        if (!acc[key]) {
            acc[key] = {
                tag: cur.tag,
                platform: cur.platform,
                articles: [],
            };
        }

        acc[key].articles.push(cur.article);

        return acc;
    }, {});

    return Object.values(grouped);
};

export const getFolderArticles = async (id: number) => {
    return getFolderTagPlatformArticles(id);
};

export const createFolder = async (name: string, userId: string) => {
    const profile = await findProfile(userId);

    if (!profile) {
        throw new Error("profile not found");
    }

    return saveFolder(name, profile.id);
};

export const createFolderTags = async (
    folder_id: number,
    items: {
        tag: string;
        platform_id: number;
    }[],
) => {
    return saveFolderTagPlatforms(folder_id, items);
};

export const getFolders = async (profileId: number) => {
    return findFolders(profileId);
};

export const updateFolder = async (params: UpdateFolderParams) => {
    const folder = await findFolder(params.id);

    if (!folder) {
        throw new Error("folder not found");
    }

    const updated = await updateFolderData(params.id, params.name);

    await deleteFolderTags(params.id);

    const saved = await saveFolderTagPlatforms(params.id, params.items ?? []);

    return {
        folder: updated,
        folderTagPlatforms: saved,
    };
};

export const deleteFolder = async (id: number) => {
    const folder = await findFolder(id);

    if (!folder) {
        throw new Error("folder not found");
    }

    await deleteFolderData(id);
};
