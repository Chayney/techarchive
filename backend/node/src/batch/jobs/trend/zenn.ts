import { DataSource } from "typeorm";
import { internal } from "../../internal/parse";
import { crawler } from "../../internal/crawler";

type RSSItem = {
    link: string;
    title: string;
    publishedAt: number;
    authorName?: string | null;
    tags?: string | null;
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

    let rss: RSSItem[];

    // ==================================================
    // ① RSS取得
    // ==================================================
    try {
        console.log("📡 fetching RSS...");
        if (!arg.rss_url) return;
        rss = await rr.getRSS(arg.rss_url);
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

        try {

            // ==================================================
            // ③ article_id抽出
            // ==================================================
            const path = internal.getURLPath(item.link);
            const parts = path.split("/items/");

            if (parts.length < 2 || !parts[1]) {
                console.warn("❌ invalid zenn url:", item.link);
                await queryRunner.rollbackTransaction();
                continue;
            }

            const articleId = parts[1];

            // ==================================================
            // ④ Zenn API（like取得）
            // ==================================================
            let api: ZennArticle;

            try {
                api = await air.getZennArticles(articleId);
            } catch (err) {
                console.error("❌ API ERROR:", articleId, err);
                await queryRunner.rollbackTransaction();
                continue;
            }

            if (!api || typeof api.likesCount === "undefined") {
                console.error("❌ invalid API response:", api);
                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==================================================
            // ⑤ DB処理（Article + Trend）
            // ==================================================
            const res = await crawler.trendArticleContentsCrawler(
                queryRunner,
                {
                    feed_id: arg.feed_id,
                    platform_id: arg.platform_id,
                    article_url: item.link,
                    article_title: item.title,
                    article_like_count: api.likesCount,
                    article_published_at: item.publishedAt,
                    article_author_name: item.authorName ?? null,
                    article_tags: item.tags ?? null,
                    article_ogp_image_url: item.imageUrl,
                }
            );

            // ==================================================
            // ⑥ rollback
            // ==================================================
            if (res.is_rollback) {
                console.warn("↩️ rollback triggered");
                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==================================================
            // ⑦ commit
            // ==================================================
            if (res.is_commit) {
                await queryRunner.commitTransaction();
            } else {
                console.warn("⚠️ no commit flag");
                await queryRunner.rollbackTransaction();
            }

        } catch (err) {
            console.error("💥 ITEM ERROR:", err);

            try {
                await queryRunner.rollbackTransaction();
            } catch { }

        } finally {
            await queryRunner.release();
        }
    }

    console.log("🏁 END Zenn CRAWLER");
};