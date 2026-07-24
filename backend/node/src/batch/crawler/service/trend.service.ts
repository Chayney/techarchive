import { saveTrends } from "../repository/trend.repository";
import { saveArticles } from "../repository/article.repository";
import { transformQiitaApiArticles } from "../transform/api/qiitaClient";
import { transformZennApiArticles } from "../transform/api/zennClient";
import { SourceType } from "../../../constant/article";

export const trendArticles = async () => {
    const qiita = await transformQiitaApiArticles();
    const zenn = await transformZennApiArticles();
    const articles = [...qiita, ...zenn];

    // articlesテーブルの自動採番IDをtrendsテーブルのarticle_idにあてがうためarticlesテーブルへの保存を先に済ませる
    const savedArticles = await saveArticles(articles);

    // 記事取得元がAPIを抽出
    const trendInputs = savedArticles
        .filter(
            (article) =>
                article.source_type === SourceType.QIITAAPI ||
                article.source_type === SourceType.ZENNAPI,
        )
        .map((article) => {
            const source = articles.find((item) => item.article_url === article.article_url);

            return {
                id: article.id,
                platform_id: article.platform_id,
                source_type: article.source_type,
                likes_count: source?.likes_count ?? 0,
                tags: source?.tags ?? null,
            };
        });

    await saveTrends(trendInputs);

    return savedArticles;
};
