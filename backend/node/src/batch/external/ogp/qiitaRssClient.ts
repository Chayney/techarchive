type QiitaArticle = {
    url: string;
    image: string | null;
};

type QiitaAtomArticle = {
    title: string;
    url: string;
};


export const fetchQiitaRssOGP = async (): Promise<QiitaArticle[]> => {
    console.log("[Qiita] fetch start");

    const response = await fetch(
        "https://qiita.com/popular-items/feed.atom"
    );

    console.log(
        "[Qiita] RSS response:",
        response.status,
        response.statusText
    );

    if (!response.ok) {
        console.error(
            "[Qiita] RSS fetch failed"
        );

        throw new Error(`Qiita API Error: ${response.status}`);
    }

    const data = await response.text();

    console.log(
        "[Qiita] RSS received length:",
        data.length
    );

    const articles = parseQiitaAtom(data);

    console.log(
        "[Qiita] parsed articles:",
        articles.length
    );

    const result: QiitaArticle[] = [];

    for (const article of articles) {
        console.log(
            "[Qiita] processing article:",
            article.title,
            article.url
        );

        const image = await fetchOgImage(article.url);

        console.log(
            "[Qiita] og:image result:",
            image
        );

        result.push({
            url: article.url,
            image
        });
    }

    console.log(
        "[Qiita] all processing finished:",
        result.length
    );

    return result;
};

// Atom XML解析
function parseQiitaAtom(xml: string): QiitaAtomArticle[] {
    console.log(
        "[Qiita] parseAtom start"
    );

    const articles: QiitaAtomArticle[] = [];

    const entries = xml.split("<entry>");

    console.log(
        "[Qiita] entry count(raw):",
        entries.length - 1
    );

    for (const entry of entries.slice(1)) {
        const titleMatch = entry.match(/<title[^>]*>(.*?)<\/title>/s);

        const urlMatch = entry.match(/<link[^>]+href="([^"]+)"/);

        console.log(
            "[Qiita] title found:",
            titleMatch?.[1]
        );

        console.log(
            "[Qiita] url found:",
            urlMatch?.[1]
        );

        if (!urlMatch) {
            console.log(
                "[Qiita] skip entry(no url)"
            );
            continue;
        }

        articles.push({
            title: titleMatch ? decodeHtml(titleMatch[1]) : "",
            url: urlMatch[1].replace(/&amp;/g, "&")
        });
    }

    console.log(
        "[Qiita] parseAtom finished:",
        articles.length
    );

    return articles;
}

// og:image取得
async function fetchOgImage(url: string): Promise<string | null> {
    console.log(
        "[Qiita] fetch article html:",
        url
    );

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    console.log(
        "[Qiita] article response:",
        response.status
    );

    if (!response.ok) {
        console.error(
            "[Qiita] article fetch failed:",
            url
        );

        return null;
    }

    const html = await response.text();

    console.log(
        "[Qiita] article html length:",
        html.length
    );

    let match = html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/
    );

    console.log(
        "[Qiita] og:image pattern1:",
        match?.[1]
    );

    if (match) {
        return convertQiitaImageUrl(match[1]);
    }

    match = html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/
    );

    console.log(
        "[Qiita] og:image pattern2:",
        match?.[1]
    );

    return match
        ? convertQiitaImageUrl(match[1])
        : null;
}



// Qiita imgix URL変換
function convertQiitaImageUrl(imageUrl: string): string {
    console.log(
        "[Qiita] original image url:",
        imageUrl
    );

    const converted =
        imageUrl
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();

    console.log(
        "[Qiita] converted image url:",
        converted
    );

    return converted;
}



// HTML decode
function decodeHtml(str: string): string {
    console.log(
        "[Qiita] decode html:",
        str
    );

    const result = str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

    console.log(
        "[Qiita] decoded:",
        result
    );

    return result;
}