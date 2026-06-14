import { QiitaClient } from "./qiitaClient";
import { ZennClient } from "./zennClient";

export const qiitaApiRepository = {
    async getQiitaArticles(articleId: string) {
        return QiitaClient.fetch(articleId);
    }
};

export const zennApiRepository = {
    async getZennArticles(articleId: string) {
        return ZennClient.fetch(articleId);
    }
};