import {
    findFeeds,
    findFolderArticles,
    findProfileByUserId,
    saveFolder,
    saveFolderTagPlatforms,
    findFolders,
    findFolderById,
    updateFolderEntity,
    deleteFolderTags,
    removeFolder,
} from "../../repository/folder.repository";

import {
    CreateFolderParam,
    CreateFolderTagPlatformsParam,
    UpdateFolderParam,
    FeedOptionGroup,
    FeedOptionFlatItem,
} from "../../types/folder";

export const getFeedOptions = async (): Promise<FeedOptionGroup[]> => {
    const feeds = await findFeeds();

    const normalizeTag = (tag: string): string => {
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

        const key = tag.trim().toLowerCase();

        return map[key] ?? tag.trim();
    };

    const flat: FeedOptionFlatItem[] = feeds.flatMap((feed) => {
        if (!feed.tags) {
            return [];
        }

        const tags = Array.from(new Set(feed.tags.split(",").map(normalizeTag).filter(Boolean)));

        return tags.map((tag) => ({
            feed_id: feed.id,

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

    return Object.values(
        flat.reduce<Record<string, FeedOptionGroup>>((acc, item) => {
            const key = `${item.tag}__${item.platform.name}`;

            if (!acc[key]) {
                acc[key] = {
                    tag: item.tag,

                    platform: item.platform,

                    articles: [],
                };
            }

            acc[key].articles.push(item.article);

            return acc;
        }, {}),
    );
};

export const getFolderArticles = async (id: number) => {
    return findFolderArticles(id);
};

export const createFolder = async ({ name, userId }: CreateFolderParam) => {
    const profile = await findProfileByUserId(userId);

    if (!profile) {
        throw new Error("profile not found");
    }

    return saveFolder({
        name,

        profile_id: profile.id,
    });
};

export const createFolderTagPlatforms = async (data: CreateFolderTagPlatformsParam) => {
    const { folder_id, items } = data;

    return saveFolderTagPlatforms(
        items.map((item) => ({
            folder_id,

            tag: item.tag,

            platform_id: item.platform_id,
        })),
    );
};

export const getFolders = async (profileId: number) => {
    return findFolders(profileId);
};

export const updateFolder = async (id: number, data: UpdateFolderParam) => {
    const folder = await findFolderById(id);

    if (!folder) {
        throw new Error("folder not found");
    }

    folder.name = data.name;

    await updateFolderEntity(folder);

    await deleteFolderTags(id);

    const saved = await saveFolderTagPlatforms(
        (data.items ?? []).map((item) => ({
            folder_id: id,

            tag: item.tag,

            platform_id: item.platform_id,
        })),
    );

    return {
        folder,

        folderTagPlatforms: saved,
    };
};

export const deleteFolder = async (id: number) => {
    const folder = await findFolderById(id);

    if (!folder) {
        throw new Error("folder not found");
    }

    return removeFolder(folder);
};
