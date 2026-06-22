import { getArticlesFromZennApiWithoutThumbnail } from "../../../crawler/repository/article.repository";

type ZennApiOgp = {
    url: string;
    image: string | null;
};

export const transformZennApiOgp = async (): Promise<
    ZennApiOgp[]
> => {
    console.log("[Zenn API] transform start");

    const articles =
        await getArticlesFromZennApiWithoutThumbnail();

    console.log(
        "[Zenn API] article count:",
        articles.length
    );

    const result = await Promise.all(
        articles.map(async (article) => {
            console.log(
                "[Zenn API] article_url:",
                article.article_url
            );

            const res = await fetch(
                article.article_url
            );

            if (!res.ok) {
                return {
                    url: article.article_url,
                    image: null,
                };
            }

            const html = await res.text();

            const match = html.match(
                /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
            );

            const image =
                match?.[1] ?? null;

            return {
                url: article.article_url,
                image,
            };
        })
    );

    console.log(
        "[Zenn API] transform finished:",
        result.length
    );

    console.table(result);

    return result;
};