import { ZennArticlesResponse } from "../types";

export const fetchZennLikesCountFromApi = async () => {
    console.log("[Zenn] fetch start");

    const articles = [];

    for (let page = 1; page <= 30; page++) {
        const response = await fetch(
            `https://zenn.dev/api/articles?count=48&order=latest&page=${page}`
        );

        console.log(`[Zenn] response${page} status:`, response.status);

        if (!response.ok) {
            throw new Error(`Zenn API Error: ${response.status}`);
        }

        const json: ZennArticlesResponse = await response.json();

        articles.push(...json.articles);
    }

    console.log("[Zenn] fetched count:", articles.length);

    return articles;
};