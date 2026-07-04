import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Folder } from "../domain/entity/folders.entity";
import { Feed } from "../domain/entity/feeds.entity";
import { FolderTagPlatform } from "../domain/entity/folder_tag_platforms.entity";

/**
 * Feed選択UI用
 * □ React / Zenn
 * □ AI / X
 */
export const getFeedOptionsHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Feed);

    try {
        const feeds = await repo.find({
            relations: {
                platform: true,
                article: true,
            },
        });

        // -----------------------------
        // 正規化関数（表記ゆれ統一）
        // -----------------------------
        const normalizeTag = (tag: string) => {
            const t = tag.trim();

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

            const key = t.toLowerCase();
            return map[key] ?? t;
        };

        // -----------------------------
        // ① flatten（タグ展開）
        // -----------------------------
        const flat = feeds.flatMap(feed => {
            if (!feed.tags) return [];

            const tags = feed.tags
                .split(",")
                .map(t => normalizeTag(t))
                .filter(Boolean);

            const uniqueTags = Array.from(new Set(tags));

            return uniqueTags.map(tag => ({
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

        // -----------------------------
        // ② 集約（React × Zenn形式へ）
        // -----------------------------
        const grouped = flat.reduce((acc, cur) => {
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
        }, {} as Record<
            string,
            {
                tag: string;
                platform: {
                    id: number;
                    name: string;
                    favicon_url: string;
                };
                articles: any[];
            }
        >);

        // object → array
        const result = Object.values(grouped);

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "failed to get feed options",
        });
    }
};

/**
 * getFeedOptionsHandlerで作成した以下を集約する
 * □ React / Zenn
 * □ AI / X
 */
// querybuilderでarticlesを返すようにしたいがsupabase clientと互換性に懸念があるためここまでの返却
export const getFolderArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(FolderTagPlatform);

    try {
        const { tagPlatformId } = req.params;
        const id = Number(tagPlatformId);

        const folderTagPlatforms = await repo.find({
            where: {
                id: id,
            },
            relations: {
                platform: {
                    feeds: {
                        article: true,
                    },
                },
            },
        });

        return res.json(folderTagPlatforms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "failed to get tag/platform articles",
        });
    }
};

/**
 * getFolderArticlesHandlerで作成した以下をユーザーが作成したフォルダによりグルーピングされる
 *  React
 * □ React / Zenn
 * □ React / Qiita
 */
export const createFolderHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Folder);

    try {
        const { name } = req.body;

        const profileId = 1; // TODO: authに置き換え

        if (!name) {
            return res.status(400).json({
                message: "name is required",
            });
        }

        const folder = repo.create({
            name,
            profile_id: profileId,
        });

        const result = await repo.save(folder);

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "failed to create folder",
        });
    }
};

// フォルダ作成と同時に作成したフォルダに閲覧記事リストを登録
export const createFolderTagPlatformsHandler: RequestHandler = async (
    req,
    res
) => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(FolderTagPlatform);

    try {
        const {
            folder_id,
            items,
        }: {
            folder_id: number;
            items: {
                tag: string;
                platform_id: number;
            }[];
        } = req.body;

        const entities = items.map(item =>
            repo.create({
                folder_id,
                tag: item.tag,
                platform_id: item.platform_id,
            })
        );

        await repo.save(entities);

        return res.status(201).json(entities);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to create folder tag platforms",
        });
    }
};

/**
 グルーピングされたフォルダの一覧を返却
 */
export const getFolderHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Folder);

    try {
        const folders = await repo.find({
            relations: {
                folderTagPlatforms: {
                    platform: true
                },
            }
        });

        return res.json(folders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "failed to get folders",
        });
    }
};
