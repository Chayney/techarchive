import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Folder } from "../domain/entity/folders.entity";
import { Feed } from "../domain/entity/feeds.entity";

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

// 重複・正規化処理
const normalizeTag = (tag: string) => {
    const map: Record<string, string> = {
        react: "React",
        "react.js": "React",
        "next.js": "Next.js",
        nextjs: "Next.js",
        typescript: "TypeScript",
        ts: "TypeScript",
        aws: "AWS",
        gcp: "GCP",
        linux: "Linux",
        javascript: "JavaScript",
        js: "JavaScript",
    };

    const key = tag.trim().toLowerCase();
    return map[key] ?? tag.trim();
};

/**
 * getFeedOptionsHandlerで作成した以下を集約する
 * □ React / Zenn
 * □ AI / X
 */
export const getFolderArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const feedRepo = db.getRepository(Feed);

    try {
        const { platform, tag } = req.query as {
            platform?: string;
            tag?: string;
        };

        const query = feedRepo
            .createQueryBuilder("feed")
            .leftJoinAndSelect("feed.platform", "platform")
            .leftJoinAndSelect("feed.article", "article");

        // -------------------------
        // platform条件（Zenn / Qiita）
        // -------------------------
        if (platform) {
            query.andWhere("platform.name = :platform", { platform });
        }

        // -------------------------
        // tag条件（react / aws）
        // -------------------------
        if (tag) {
            query.andWhere("LOWER(feed.tags) LIKE :tag", {
                tag: `%${tag.toLowerCase()}%`,
            });
        }

        const feeds = await query.getMany();

        const result = feeds.map(feed => ({
            id: feed.article.id,
            title: feed.article.title,
            article_url: feed.article.article_url,
            thumbnail_url: feed.article.thumbnail_url,
            published_at: feed.article.published_at,

            feed: {
                tags: feed.tags,
                platform: {
                    name: feed.platform?.name,
                    favicon_url: feed.platform?.favicon_url,
                },
            },
        }));

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "failed to get folder articles",
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

/**
 グルーピングされたフォルダの一覧を返却
 */
export const getFolderHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Folder);

    try {
        const folders = await repo.find({
            select: {
                id: true,
                name: true,
                profile_id: true,
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
