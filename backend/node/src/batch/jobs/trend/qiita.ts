import { DataSource } from "typeorm";
import { internal } from "../../internal/parse";
import { crawler } from "../../internal/crawler";

const remove_path = "/items/";

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
    likesCount: number;
};

type QiitaAPIReader = {
    getQiitaArticles(articleId: string): Promise<QiitaArticle>;
};

type QiitaArticleCrawlerArg = {
    feed_id: number;
    platform_id: number;
    feed_name: string;
    rss_url: string;
    is_eng: boolean;
};

export const qiitaArticleCrawler = async (
    dataSource: DataSource,
    rr: RSSReader,
    air: QiitaAPIReader,
    arg: QiitaArticleCrawlerArg
): Promise<void> => {
    console.log(`【start qiita article crawler】: ${arg.feed_name}`);

    let a_count = 0;
    let far_count = 0;
    let ta_created_count = 0;
    let ta_updated_count = 0;

    let rss: RSSItem[];

    try {
        rss = await rr.getRSS(arg.rss_url);
    } catch (err) {
        console.error(`【error get rss】: ${arg.feed_name}`, err);
        return;
    }

    for (const r of rss) {
        const queryRunner = dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const path = internal.getURLPath(r.link);
            const parts = path.split(remove_path);

            if (parts.length < 2) {
                console.error(`【error cut url path】: ${path}`);
                await queryRunner.rollbackTransaction();
                continue;
            }

            const qiita_article_id = parts[1];

            let q: QiitaArticle;

            try {
                q = await air.getQiitaArticles(qiita_article_id);
            } catch (err) {
                console.error(
                    `【error get qiita articles api】: ${arg.feed_name}`,
                    err
                );

                await queryRunner.rollbackTransaction();
                continue;
            }

            const res = await crawler.trendArticleContentsCrawler(
                queryRunner,
                {
                    feed_id: arg.feed_id,
                    platform_id: arg.platform_id,
                    article_title: r.title,
                    article_url: r.link,
                    article_like_count: q.likesCount,
                    article_published_at: r.publishedAt,
                    article_author_name: r.authorName ?? null,
                    article_tags: r.tags ?? null,
                    article_ogp_image_url: r.imageUrl,
                    is_eng: arg.is_eng,
                }
            );

            if (res.is_rollback) {
                await queryRunner.rollbackTransaction();
                continue;
            }

            if (res.is_commit) {
                if (res.is_created_article) a_count++;
                if (res.is_created_feed_article_relation) far_count++;
                if (res.is_created_trend_article) ta_created_count++;
                if (res.is_updated_trend_article) ta_updated_count++;

                await queryRunner.commitTransaction();
            } else {
                await queryRunner.rollbackTransaction();
            }
        } catch (err) {
            console.error(
                `【error create article】: feed: ${arg.feed_name}`,
                err
            );

            try {
                await queryRunner.rollbackTransaction();
            } catch (rollback_err) {
                console.error("【error rollback transaction】:", rollback_err);
            }
        } finally {
            await queryRunner.release();
        }
    }

    console.log(`【end qiita article crawler】: ${arg.feed_name}`);
    console.log(`【add article count】: ${a_count}`);
    console.log(`【add feed_article_relation count】: ${far_count}`);
    console.log(`【add trend_article count】: ${ta_created_count}`);
    console.log(`【update trend_article count】: ${ta_updated_count}`);
};