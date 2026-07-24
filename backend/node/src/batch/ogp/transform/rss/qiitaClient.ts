import { getArticlesFromQiitaRssWithoutThumbnail } from "../../../crawler/repository/article.repository";
import { OgpProps } from "../../types";

export const transformQiitaRssOgp = async (): Promise<OgpProps[]> => {
    console.log("[Qiita RSS] transform start");

    const articles = await getArticlesFromQiitaRssWithoutThumbnail();

    console.log("[Qiita RSS] article count:", articles.length);

    const result = [];

    for (let i = 0; i < articles.length; i += 10) {
        const chunk = articles.slice(i, i + 10);

        const chunkResult = await Promise.all(
            chunk.map(async (article) => {
                console.log("[Qiita RSS] fetch ogp:", article.article_url);

                const image = await fetchQiitaOgpImage(article.article_url);

                console.log("[Qiita RSS] og:image:", image);

                return {
                    url: article.article_url,
                    image,
                };
            }),
        );

        result.push(...chunkResult);
    }

    console.log("[Qiita RSS] transform finished:", result.length);

    console.table(result);

    return result;
};

const fetchQiitaOgpImage = async (url: string): Promise<string | null> => {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    });

    console.log("[Qiita RSS] article response:", response.status, url);

    if (!response.ok) {
        return null;
    }

    const html = await response.text();

    let match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    if (!match) {
        match = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    }

    if (!match) {
        console.warn("[Qiita RSS] og:image not found:", url);

        return null;
    }

    const imageUrl = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

    console.log("[Qiita RSS] extracted og:image:", imageUrl);

    return imageUrl;
};
