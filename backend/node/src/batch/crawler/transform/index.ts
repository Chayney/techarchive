import { transformQiitaApiArticles } from "./api/qiitaClient";
import { transformZennApiArticles } from "./api/zennClient";
import { transformQiitaRssArticles } from "./rss/qiitaClient";
import { transformZennRssArticles } from "./rss/zennClient";

export const fetchArticleList = async () => {
    const [qiitaApiArticles, zennApiArticles, qiitaRssArticles, zennRssArticles] =
        await Promise.all([
            transformQiitaApiArticles(),
            transformZennApiArticles(),
            transformQiitaRssArticles(),
            transformZennRssArticles(),
        ]);

    return {
        qiitaApi: qiitaApiArticles,
        zennApi: zennApiArticles,
        qiitaRss: qiitaRssArticles,
        zennRss: zennRssArticles,
    };
};
