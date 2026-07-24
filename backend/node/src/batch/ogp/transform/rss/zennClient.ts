import { getArticlesFromZennRssWithoutThumbnail } from "../../../crawler/repository/article.repository";
import { OgpProps } from "../../types";

export const transformZennRssOgp = async (): Promise<OgpProps[]> => {
    console.log("[Zenn] transform start");

    const articles = await getArticlesFromZennRssWithoutThumbnail();

    console.log("[Zenn] article count:", articles.length);

    const result = [];

    for (let i = 0; i < articles.length; i += 10) {
        const chunk = articles.slice(i, i + 10);

        const chunkResult = await Promise.all(
            chunk.map(async (article) => {
                console.log("[Zenn] fetch ogp:", article.article_url);

                const image = await fetchZennOgpImage(article.article_url);

                console.log("[Zenn] og:image:", image);

                return {
                    url: article.article_url,
                    image,
                };
            }),
        );

        result.push(...chunkResult);
    }

    console.log("[Zenn] transform finished:", result.length);

    console.table(result);

    return result;
};

const fetchZennOgpImage = async (url: string): Promise<string | null> => {
    console.log("[Zenn] fetch article:", url);

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0",
        },
    });

    console.log("[Zenn] article response:", response.status);

    if (!response.ok) {
        console.error("[Zenn] article fetch failed:", url);

        return null;
    }

    const html = await response.text();

    console.log("[Zenn] html length:", html.length);

    let match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    console.log("[Zenn] og:image pattern1:", match?.[1]);

    if (!match) {
        match = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

        console.log("[Zenn] og:image pattern2:", match?.[1]);
    }

    if (!match) {
        console.warn("[Zenn] og:image not found:", url);

        return null;
    }

    const imageUrl = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

    console.log("[Zenn] OGP IMAGE URL:", imageUrl);

    return imageUrl;
};
