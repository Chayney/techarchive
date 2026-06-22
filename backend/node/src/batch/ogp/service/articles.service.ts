import { transformQiitaApiOgp } from "../transform/api/qiitaClient";
import { transformZennApiOgp } from "../transform/api/zennClient";
import { transformQiitaRssOgp } from "../transform/rss/qiitaClient";
import { transformZennRssOgp } from "../transform/rss/zennClient";


export const ogps = async () => {
    const qiitaApiReponse = await transformQiitaApiOgp();
    const zennApiResponse = await transformZennApiOgp();
    const qiitaRssResponse = await transformQiitaRssOgp();
    const zennRssResponse = await transformZennRssOgp();

    const articles = [
        ...qiitaApiReponse,
        ...zennApiResponse,
        ...qiitaRssResponse,
        ...zennRssResponse
    ];

    return articles;
}