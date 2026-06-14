import { AtomClient } from "./atomClient";
import { RSSClient } from "./rssClient";

export const rssRepository = {
    async getRSS(url: string) {
        const host = new URL(url).hostname;

        switch (host) {
            case "zenn.dev":
                return RSSClient.fetch(url);

            case "qiita.com":
                return AtomClient.fetch(url);

            default:
                return RSSClient.fetch(url);
        }
    }
};