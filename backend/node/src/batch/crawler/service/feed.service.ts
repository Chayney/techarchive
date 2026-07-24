import { SourceType } from "../../../constant/article";
import { saveArticles } from "../repository/article.repository";
import { transformQiitaRssArticles } from "../transform/rss/qiitaClient";
import { transformZennRssArticles } from "../transform/rss/zennClient";
import { saveFeeds } from "../repository/feed.repository";

export const feedArticles = async () => {
    const qiita = await transformQiitaRssArticles();
    const zenn = await transformZennRssArticles();
    const articles = [...qiita, ...zenn];

    // articlesテーブルの自動採番IDをtrendsテーブルのarticle_idにあてがうためarticlesテーブルへの保存を先に済ませる
    const savedArticles = await saveArticles(articles);

    // 記事取得元がRSSを抽出
    const feedInputs = savedArticles
        .filter(
            (article) =>
                article.source_type === SourceType.QIITARSS ||
                article.source_type === SourceType.ZENNRSS,
        )
        .map((article) => {
            const source = articles.find((item) => item.article_url === article.article_url);

            return {
                id: article.id,
                platform_id: article.platform_id,
                tags: source?.tags ?? null,
            };
        });

    await saveFeeds(feedInputs);

    return savedArticles;
};
