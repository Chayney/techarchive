import { PlatformId, SourceType } from "../../../constant/article";
import { fetchZennRssArticles } from "../../external/rss/zennClient";

type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
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

            if (!link) {
                console.warn("[Zenn Transform] skip article",{
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
                tags: "Zennのフィード",
                thumbnail_url: null,
                is_private: false,
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