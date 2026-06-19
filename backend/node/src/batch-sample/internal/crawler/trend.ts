import { QueryRunner } from "typeorm";
import { Trend } from "../../../domain/entity/trends.entity";
import { Article } from "../../../domain/entity/articles.entity";

const one_hour_ago = () => new Date(Date.now() - 60 * 60 * 1000);

export type TrendArticleContentsCrawlerArg = {
    feed_id: number;
    platform_id: number;
    article_url: string;
    article_title: string;
    article_like_count: number;
    article_published_at: number;
    article_author_name: string | null;
    article_tags: string | null;
    article_ogp_image_url: string | null;
};

export type TrendArticleContentsCrawlerResponse = {
    is_created_trend_article: boolean;
    is_updated_trend_article: boolean;
    is_created_article: boolean;
    is_rollback: boolean;
    is_commit: boolean;
};

export const trendArticleContentsCrawler = async (
    queryRunner: QueryRunner,
    arg: TrendArticleContentsCrawlerArg
): Promise<TrendArticleContentsCrawlerResponse> => {

    let is_created_trend_article = false;
    let is_updated_trend_article = false;
    let is_created_article = false;

    const repo = queryRunner.manager;

    try {
        // ==================================================
        // 1. article取得
        // ==================================================
        let article = await repo.findOne(Article, {
            where: {
                article_url: arg.article_url,
                platform_id: arg.platform_id,
            },
        });

        // ==================================================
        // 2. articleが存在する場合
        // ==================================================
        if (article) {

            // ==================================================
            // 3. trend取得
            // ==================================================
            let trend = await repo.findOne(Trend, {
                where: {
                    article_id: article.id,
                    platform_id: arg.platform_id,
                },
            });

            // ==================================================
            // 3-1. trend作成
            // ==================================================
            if (!trend) {
                const newTrend = repo.create(Trend, {
                    article_id: article.id,
                    platform_id: arg.platform_id,
                    like_count: arg.article_like_count,
                });

                await repo.save(newTrend);
                is_created_trend_article = true;
            }

            // ==================================================
            // 3-2. trend更新
            // ==================================================
            if (
                trend &&
                trend.updated_at < one_hour_ago() &&
                trend.like_count < arg.article_like_count
            ) {
                trend.like_count = arg.article_like_count;
                await repo.save(trend);
                is_updated_trend_article = true;
            }

            return {
                is_created_trend_article,
                is_updated_trend_article,
                is_created_article: false,
                is_rollback: false,
                is_commit: true,
            };
        }

        // ==================================================
        // 4. article作成
        // ==================================================
        const newArticle = repo.create(Article, {
            platform_id: arg.platform_id,
            feed_id: arg.feed_id,
            title: arg.article_title,
            article_url: arg.article_url,
            thumbnail_url: arg.article_ogp_image_url,
            tags: arg.article_tags,
            created_at: new Date(arg.article_published_at),
            updated_at: new Date(),

            is_private: false,
        });

        await repo.save(newArticle);
        is_created_article = true;

        // ==================================================
        // 5. trend作成
        // ==================================================
        const newTrend = repo.create(Trend, {
            article_id: newArticle.id,
            platform_id: arg.platform_id,
            like_count: arg.article_like_count,
        });

        await repo.save(newTrend);
        is_created_trend_article = true;

        return {
            is_created_trend_article,
            is_updated_trend_article,
            is_created_article,
            is_rollback: false,
            is_commit: true,
        };

    } catch (err) {
        console.error("trend crawler error:", err);

        return {
            is_created_trend_article: false,
            is_updated_trend_article: false,
            is_created_article: false,
            is_rollback: true,
            is_commit: false,
        };
    }
};