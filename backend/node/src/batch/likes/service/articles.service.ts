import { fetchQiitaLikesCountFromApi } from "../external/qiitaClient";
import { transformZennLikesCount } from "../transform/zennClient";

export const filteredArticles = async () => {
    const qiita = await fetchQiitaLikesCountFromApi();
    const zenn = await transformZennLikesCount();

    const articles = [...qiita, ...zenn];

    // 公開日が7日以内かついいね数が20以上の記事を抽出
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const targetArticles = articles.filter(
        (article) => article.published_at >= sevenDaysAgo && article.likes_count >= 1,
    );
    return targetArticles;
};
