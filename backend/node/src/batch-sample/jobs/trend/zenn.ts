import { DataSource } from "typeorm";
import { internal } from "../../internal/parse";
import { crawler } from "../../internal/crawler";

type RSSItem = {
    link: string;
    title: string;
    publishedAt: number;
    authorName: string;
    tags: string;
    imageUrl: string;
};

type RSSReader = {
    getRSS(url: string): Promise<RSSItem[]>;
};

type ZennArticle = {
    likesCount: number;
};

type ZennAPIReader = {
    getZennArticles(articleId: string): Promise<ZennArticle>;
};

// ==================================================
// Feedから必要最小限だけ渡す
// ==================================================
type ZennArticleCrawlerArg = {
    feed_id: number;
    platform_id: number;
    rss_url: string | null;
};

export const zennArticleCrawler = async (
    dataSource: DataSource,
    rr: RSSReader,
    air: ZennAPIReader,
    arg: ZennArticleCrawlerArg
): Promise<void> => {
    console.log("\n🚀 START Zenn CRAWLER");

    if (!arg.rss_url) {
        console.warn("⚠️ rss_url is null");
        return;
    }

    let rss: RSSItem[] = [];

    // ==================================================
    // ① RSS取得
    // ==================================================
    try {
        console.log("📡 fetching RSS...");
        rss = await rr.getRSS(arg.rss_url);

        if (!Array.isArray(rss)) {
            throw new Error("RSS is not array");
        }

        console.log(`✅ RSS fetched: ${rss.length}`);
    } catch (err) {
        console.error("❌ RSS ERROR", err);
        return;
    }

    // ==================================================
    // ② RSSループ
    // ==================================================
    for (const item of rss) {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        console.log("\n==============================");
        console.log("📄 NEW ITEM START");

        // ==================================================
        // 🔥 1. item全体（最重要）
        // ==================================================
        console.log("📦 ITEM RAW (FULL):");
        console.dir(item, {
            depth: null,   // ネスト全部表示
            colors: true,  // 見やすく
        });

        // JSON版（ログ保存用）
        console.log("📦 ITEM JSON:");
        console.log(JSON.stringify(item, null, 2));

        // ==================================================
        // 🔥 2. key一覧（構造把握）
        // ==================================================
        console.log("🔑 ITEM KEYS:", Object.keys(item));

        // ==================================================
        // 🔥 3. よく使う候補フィールド
        // ==================================================
        
      

        console.log("📝 title:", item.title);
       
        console.log("📅 publishedAt:", item.publishedAt);

        const rawUrl = item.link;

        console.log("RAW URL:", rawUrl);
        console.log("TITLE:", item.title);

        try {
            // ==================================================
            // ① URLチェック
            // ==================================================
            if (!rawUrl) {
                console.warn("⚠️ SKIP: missing url");
                await queryRunner.rollbackTransaction();
                continue;
            }

            let path: string;

            try {
                const url = new URL(rawUrl);
                path = url.pathname;
            } catch (e) {
                console.error("❌ invalid URL format:", rawUrl, e);
                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==================================================
            // ② Zenn slug extract
            // ==================================================
            const match = path.match(/\/articles\/([^\/]+)/);

            if (!match) {
                console.warn("❌ NOT ZENN ARTICLE URL");
                console.warn("path:", path);
                await queryRunner.rollbackTransaction();
                continue;
            }

            const articleId = match[1];
            console.log("🧩 articleId:", articleId);

            // ==================================================
            // ③ Zenn API
            // ==================================================
            let api: ZennArticle;

            try {
                console.log("🌐 calling Zenn API...");
                api = await air.getZennArticles(articleId);
            } catch (err) {
                console.error("❌ API ERROR:", articleId, err);
                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==================================================
            // ④ API validation
            // ==================================================
            const likeCount = api?.likesCount ?? api?.likesCount;

            if (likeCount == null) {
                console.error("❌ invalid API response shape");
                await queryRunner.rollbackTransaction();
                continue;
            }

            console.log("❤️ likeCount:", likeCount);

            // ==================================================
            // ⑤ DB処理
            // ==================================================
            const res = await crawler.trendArticleContentsCrawler(
                queryRunner,
                {
                    feed_id: arg.feed_id,
                    platform_id: arg.platform_id,

                    article_url: rawUrl,
                    article_title: item.title,

                    article_like_count: likeCount,
                    article_published_at: item.publishedAt,
                    article_author_name: item.authorName,
                    article_tags: item.tags,
                    article_ogp_image_url: item.imageUrl,
                }
            );

            console.log("📦 crawler result:", JSON.stringify(res, null, 2));

            // ==================================================
            // ⑥ rollback
            // ==================================================
            if (res.is_rollback) {
                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==================================================
            // ⑦ commit
            // ==================================================
            if (res.is_commit) {
                await queryRunner.commitTransaction();
            } else {
                await queryRunner.rollbackTransaction();
            }

        } catch (err) {
            console.error("💥 ITEM FATAL ERROR:", err);

            try {
                await queryRunner.rollbackTransaction();
            } catch { }

        } finally {
            await queryRunner.release();
        }
    }

    console.log("🏁 END Zenn CRAWLER");
};