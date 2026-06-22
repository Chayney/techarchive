import { transformQiitaApiArticles } from "../transform/api/qiitaClient";
import { transformZennApiArticles } from "../transform/api/zennClient";
import { transformQiitaRssArticles } from "../transform/rss/qiitaClient";
import { transformZennRssArticles } from "../transform/rss/zennClient";

export const articles = async () => {
    const qiitaApiReponse = await transformQiitaApiArticles();
    const zennApiResponse = await transformZennApiArticles();
    const qiitaRssResponse = await transformQiitaRssArticles();
    const zennRssResponse = await transformZennRssArticles();

    const articles = [
        ...qiitaApiReponse,
        ...zennApiResponse,
        ...qiitaRssResponse,
        ...zennRssResponse
    ];

    return articles;
}