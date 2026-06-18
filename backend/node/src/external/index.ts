import { transformQiitaArticles } from "../transform/api/qiitaClient";
import { fetchQiitaArticles } from "./api/qiitaClient";
import { fetchZennArticles } from "./api/zennClient";
import { transformZennArticles } from "../transform/api/zennClient";

export const fetchArticleList = async () => {
    const [
        qiitaApiArticles,
        zennApiArticles,
    ] = await Promise.all([
        transformQiitaArticles(),
        transformZennArticles(),
        // fetchQiitaArticles(),
        // fetchZennArticles()
    ]);

    return {
        qiitaApi: qiitaApiArticles,
        zennApi: zennApiArticles
    };
};