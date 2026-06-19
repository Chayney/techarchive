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

type QiitaArticle = {
    id: string;
    likes_count: number;
};

type QiitaAPIReader = {
    getQiitaArticles(): Promise<QiitaArticle[]>;
};

type QiitaArticleCrawlerArg = {
    feed_id: number;
    platform_id: number;
    rss_url: string | null;
};

export const qiitaArticleCrawler = async (
    dataSource: DataSource,
    rr: RSSReader,
    air: QiitaAPIReader,
    arg: QiitaArticleCrawlerArg
): Promise<void> => {

    console.log("\n🚀 START QIITA CRAWLER");

    let rss: RSSItem[];

    // ==========================================
    // RSS取得
    // ==========================================
    try {
        console.log("📡 fetching RSS...");

        if (!arg.rss_url) {
            console.warn("rss_url is null");
            return;
        }

        rss = await rr.getRSS(arg.rss_url);

        console.log(`✅ RSS fetched: ${rss.length}`);

    } catch (err) {
        console.error("❌ RSS ERROR", err);
        return;
    }

    // ==========================================
    // Qiita API一括取得
    // ==========================================
    let likeMap = new Map<string, number>();

    try {

        console.log("📡 fetching Qiita API...");

        const apiItems = await air.getQiitaArticles();

        likeMap = new Map(
            apiItems.map((item) => [
                item.id,
                item.likes_count,
            ])
        );

        console.log(
            `✅ Qiita API fetched: ${apiItems.length}`
        );

    } catch (err) {
        console.error("❌ Qiita API ERROR", err);
        return;
    }

    let matchedCount = 0;
    let notMatchedCount = 0;

    // ==========================================
    // RSSループ
    // ==========================================
    for (const item of rss) {

        const queryRunner =
            dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            // ==========================================
            // article id抽出
            // ==========================================
            let articleId: string;

            try {

                const url = new URL(item.link);

                const parts =
                    url.pathname.split("/items/");

                if (
                    parts.length < 2 ||
                    !parts[1]
                ) {
                    console.warn(
                        "❌ invalid qiita url:",
                        item.link
                    );

                    await queryRunner.rollbackTransaction();
                    continue;
                }

                articleId = parts[1];

            } catch {

                console.warn(
                    "❌ invalid url:",
                    item.link
                );

                await queryRunner.rollbackTransaction();
                continue;
            }

            // ==========================================
            // Map照合
            // ==========================================
            const likesCount =
                likeMap.get(articleId);

            if (likesCount === undefined) {

                notMatchedCount++;

                console.warn(
                    `⚠️ NOT FOUND IN API: ${articleId}`
                );

            } else {

                matchedCount++;

            }

            // ==========================================
            // DB保存
            // ==========================================
            const res =
                await crawler.trendArticleContentsCrawler(
                    queryRunner,
                    {
                        feed_id: arg.feed_id,
                        platform_id: arg.platform_id,

                        article_url: item.link,
                        article_title: item.title,

                        article_like_count:
                            likesCount ?? 0,

                        article_published_at:
                            item.publishedAt,

                        article_author_name:
                            item.authorName ?? null,

                        article_tags:
                            item.tags ?? null,

                        article_ogp_image_url:
                            item.imageUrl,
                    }
                );

            if (res.is_rollback) {

                console.warn(
                    "↩️ rollback triggered"
                );

                await queryRunner.rollbackTransaction();

                continue;
            }

            if (res.is_commit) {

                await queryRunner.commitTransaction();

            } else {

                await queryRunner.rollbackTransaction();

            }

        } catch (err) {

            console.error(
                "💥 ITEM ERROR:",
                err
            );

            try {
                await queryRunner.rollbackTransaction();
            } catch { }

        } finally {

            await queryRunner.release();

        }
    }

    // ==========================================
    // 集計結果
    // ==========================================
    const total =
        matchedCount + notMatchedCount;

    console.log("\n📊 MATCH RESULT");

    console.log(
        `matched     : ${matchedCount}`
    );

    console.log(
        `not matched : ${notMatchedCount}`
    );

    console.log(
        `match rate  : ${total === 0
            ? 0
            : (
                matchedCount /
                total
            ) * 100
        }%`
    );

    console.log("🏁 END QIITA CRAWLER");
};