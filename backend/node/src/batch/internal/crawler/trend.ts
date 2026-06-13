import { QueryRunner } from "typeorm";
import { FeedArticleRelation } from "../../../domain/entity/feed_article_relations";
import { Trend } from "../../../domain/entity/trends.entity";
import { Article } from "../../../domain/entity/articles.entity";

const one_hour_ago = () => new Date(Date.now() - 60 * 60 * 1000);

export type TrendArticleContentsCrawlerArg = {
    feed_id: number;
    platform_id: number;
    article_title: string;
    article_url: string;
    article_like_count: number;
    article_published_at: number;
    article_author_name?: string | null;
    article_tags?: string | null;
    article_ogp_image_url: string;
    is_eng: boolean;
};

export type TrendArticleContentsCrawlerResponse = {
    is_created_trend_article: boolean;
    is_updated_trend_article: boolean;
    is_created_article: boolean;
    is_created_feed_article_relation: boolean;
    is_rollback: boolean;
    is_commit: boolean;
};

export const trendArticleContentsCrawler = async (
    queryRunner: QueryRunner,
    arg: TrendArticleContentsCrawlerArg
): Promise<TrendArticleContentsCrawlerResponse> => {
    let is_created_feed_article_relation = false;
    let is_created_trend_article = false;
    let is_updated_trend_article = false;

    const repo = queryRunner.manager;

    try {
        // =========================
        // 1. article取得
        // =========================
        let article = await repo.findOne(Article, {
            where: {
                article_url: arg.article_url,
                platform_id: arg.platform_id,
            },
        });

        if (article) {
            // =========================
            // 2. trend_article取得
            // =========================
            let trend = await repo.findOne(Trend, {
                where: {
                    article_id: article.id,
                    platform_id: arg.platform_id,
                },
            });

            // =========================
            // 2-1. trend新規作成
            // =========================
            if (!trend) {
                const new_trend = repo.create(Trend, {
                    article_id: article.id,
                    platform_id: arg.platform_id,
                    like_count: arg.article_like_count,
                });

                await repo.save(new_trend);
                is_created_trend_article = true;
            }

            // =========================
            // 2-2. trend更新
            // =========================
            if (
                trend &&
                trend.updated_at < one_hour_ago() &&
                trend.like_count < arg.article_like_count
            ) {
                trend.like_count = arg.article_like_count;
                await repo.save(trend);
                is_updated_trend_article = true;
            }

            // =========================
            // 3. feed_article_relationチェック
            // =========================
            let relation = await repo.findOne(FeedArticleRelation, {
                where: {
                    feed_id: arg.feed_id,
                    article_id: article.id,
                },
            });

            if (!relation) {
                const new_relation = repo.create(FeedArticleRelation, {
                    feed_id: arg.feed_id,
                    article_id: article.id,
                });

                await repo.save(new_relation);
                is_created_feed_article_relation = true;
            }

            return {
                is_created_trend_article,
                is_updated_trend_article,
                is_created_article: false,
                is_created_feed_article_relation,
                is_rollback: false,
                is_commit: true,
            };
        }

        // =========================
        // 4. article新規作成
        // =========================
        const new_article = repo.create(Article, {
            platform_id: arg.platform_id,
            title: arg.article_title,
            description: "",
            thumbnail_url: arg.article_ogp_image_url,
            article_url: arg.article_url,
            published_at: arg.article_published_at,
            author_name: arg.article_author_name ?? null,
            tags: arg.article_tags ?? null,
            is_eng: arg.is_eng,
        });

        await repo.save(new_article);

        // =========================
        // 5. feed_article_relation作成
        // =========================
        const new_relation = repo.create(FeedArticleRelation, {
            feed_id: arg.feed_id,
            article_id: new_article.id,
        });

        await repo.save(new_relation);

        // =========================
        // 6. trend_article作成
        // =========================
        const new_trend = repo.create(Trend, {
            article_id: new_article.id,
            platform_id: arg.platform_id,
            like_count: arg.article_like_count,
        });

        await repo.save(new_trend);

        return {
            is_created_trend_article: true,
            is_updated_trend_article: false,
            is_created_article: true,
            is_created_feed_article_relation: true,
            is_rollback: false,
            is_commit: true,
        };
    } catch (err) {
        console.error("【error trend crawler】: ", err);

        return {
            is_created_trend_article: false,
            is_updated_trend_article: false,
            is_created_article: false,
            is_created_feed_article_relation: false,
            is_rollback: true,
            is_commit: false,
        };
    }
};