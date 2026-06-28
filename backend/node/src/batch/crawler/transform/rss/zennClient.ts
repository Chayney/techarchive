import { PlatformId, SourceType } from "../../../../constant/article";
import { fetchZennRssArticles } from "../../external/rss/zennClient";

type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    published_at: Date;
};

export const transformZennRssArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Zenn Transform] start");

    try {
        const xml = await fetchZennRssArticles();

        // RSS2.0 / Atom 両対応
        const isAtom = xml.includes("<entry>");
        const blockTag = isAtom ? "entry" : "item";

        const itemBlocks = xml
            .split(`<${blockTag}>`)
            .slice(1);

        console.log("[Zenn Transform] entries", {
            format: isAtom ? "ATOM" : "RSS2.0",
            count: itemBlocks.length,
        });

        const items: ArticleCreateInput[] = [];

        for (const block of itemBlocks) {
            const itemXml = block.split(`</${blockTag}>`)[0];
            const rawUrl = itemXml.match(/<link[^>]*>(.*?)<\/link>/s,)?.[1] || itemXml.match(/<link[^>]+href="([^"]+)"/)?.[1] || itemXml.match(/<guid[^>]*>(.*?)<\/guid>/s,)?.[1] || "";

            const link = rawUrl.replace(/[\u200B-\u200D\uFEFF\u2060]/g, "").trim();

            const title = matchTag(itemXml, "title") ?? "";

            const pubDate = matchTag(itemXml, "pubDate") ?? "";

            const html = await fetchArticleHtml(link);

            const tags = extractZennTags(html);

            console.log("[Zenn Transform] scraped tags", {
                title,
                tags,
            });

            if (!link) {
                console.warn("[Zenn Transform] skip article", {
                    reason: "missing url",
                    title,
                },
                );

                continue;
            }

            items.push({
                platform_id: PlatformId.ZENN,
                source_type: SourceType.ZENNRSS,
                title,
                article_url: link,
                tags: tags,
                thumbnail_url: null,
                is_private: false,
                published_at: new Date(pubDate)
            });
        }

        console.log("[Zenn Transform] completed", {
            count: items.length,
        });

        return items;
    } catch (error) {
        console.error(
            "[Zenn Transform] failed",
            error,
        );

        throw error;
    }
};


// =======================
// helper functions
// =======================

function matchTag(
    xml: string,
    tag: string,
): string | null {
    const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`, "s"));

    if (!match) {
        return null;
    }

    return match[1]
        .replace("<![CDATA[", "")
        .replace("]]>", "")
        .trim();
}

async function fetchArticleHtml(
    url: string,
): Promise<string> {

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(
            `failed fetch ${url}`
        );
    }

    return res.text();
}

function extractZennTags(
    html: string,
): string | null {

    const matches = [
        ...html.matchAll(
            /"topics":(\[.*?\])/gs
        ),
    ];

    if (!matches.length) {
        console.log(
            "[Zenn Tag Extract] not found"
        );

        return null;
    }


    try {

        const topics = JSON.parse(
            matches[0][1]
        );


        const tags = topics.map(
            (t: any) =>
                t.name ?? t.slug
        );


        console.log(
            "[Zenn Tag Extract] parsed",
            {
                tags,
            }
        );


        return tags.join(",");

    } catch (e) {

        console.error(
            "[Zenn Tag Extract] parse failed",
            e,
        );

        return null;
    }
}