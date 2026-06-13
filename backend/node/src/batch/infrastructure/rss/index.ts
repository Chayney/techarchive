import { RSSClient } from "./rssClient";

export const rssRepository = {
    async getRSS(url: string) {
        return RSSClient.fetch(url);
    },
};