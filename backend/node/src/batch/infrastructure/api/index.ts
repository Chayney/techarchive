import { QiitaClient } from "./qiitaClient";

export const qiitaApiRepository = {
    async getQiitaArticles(articleId: string) {
        return QiitaClient.fetch(articleId);
    },
};