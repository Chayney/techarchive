import { getArticlesFromQiitaApiWithoutThumbnail } from "../../../crawler/repository/article.repository";

type QiitaApiOgp = {
    url: string;
    image: string | null;
};

export const transformQiitaApiOgp = async (): Promise<
    QiitaApiOgp[]
> => {
    console.log("[Qiita API] transform start");

    const articles =
        await getArticlesFromQiitaApiWithoutThumbnail();

    console.log(
        "[Qiita API] article count:",
        articles.length
    );

    const result = await Promise.all(
        articles.map(
            async (
                article: {
                    article_url: string;
                }
            ) => {
                console.log(
                    "[Qiita API] --------------------"
                );

                console.log(
                    "[Qiita API] article_url:",
                    article.article_url
                );

                const image =
                    await fetchQiitaOgpImage(
                        article.article_url
                    );

                console.log(
                    "[Qiita API] final result:"
                );

                console.log({
                    url: article.article_url,
                    image
                });

                return {
                    url: article.article_url,
                    image
                };
            }
        )
    );

    console.log(
        "[Qiita API] transform finished:",
        result.length
    );

    console.table(result);

    return result;
};

const fetchQiitaOgpImage = async (
    url: string
): Promise<string | null> => {
    console.log(
        "[Qiita API] fetch article:",
        url
    );

    const response = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0"
        }
    });

    console.log(
        "[Qiita API] article response:",
        response.status,
        response.statusText
    );

    if (!response.ok) {
        console.error(
            "[Qiita API] article fetch failed:",
            url
        );

        return null;
    }

    const html = await response.text();

    console.log(
        "[Qiita API] html length:",
        html.length
    );

    let match = html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
    );

    console.log(
        "[Qiita API] og:image pattern1:",
        match?.[1] ?? "NOT FOUND"
    );

    if (!match) {
        match = html.match(
            /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
        );

        console.log(
            "[Qiita API] og:image pattern2:",
            match?.[1] ?? "NOT FOUND"
        );
    }

    if (!match) {
        console.warn(
            "[Qiita API] og:image not found:",
            url
        );

        return null;
    }

    const imageUrl = match[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

    console.log(
        "[Qiita API] OGP IMAGE URL:"
    );

    console.log(imageUrl);

    return imageUrl;
};