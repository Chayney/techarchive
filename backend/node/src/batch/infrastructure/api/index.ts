import { QiitaClient } from "./qiitaClient";
import { ZennClient } from "./zennClient";

export const qiitaApiRepository = {
    async getQiitaArticles() {
        return QiitaClient.getQiitaArticles();
    }
};

export const zennApiRepository = {
    async getZennArticles(articleId: string) {
        return ZennClient.fetch(articleId);
    }
};