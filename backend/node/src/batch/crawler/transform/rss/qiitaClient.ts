import { PlatformId, SourceType } from "../../../../constant/article";
import { fetchQiitaRssArticles } from "../../external/rss/qiitaClient";

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

export const transformQiitaRssArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Qiita Transform] start");

    try {
        const xml = await fetchQiitaRssArticles();

        const itemBlocks = xml
            .split("<entry>")
            .slice(1);

        console.log("[Qiita Transform] entries", {
            count: itemBlocks.length,
        });

        const items: ArticleCreateInput[] = [];

        for (const block of itemBlocks) {
            const itemXml = block.split("</entry>")[0];

            const link = itemXml.match(/<link[^>]+href="([^"]+)"/)?.[1] ?? "";

            const title = matchTag(itemXml, "title") ?? "";

            const published = matchTag(itemXml, "published") ?? "";

            items.push({
                platform_id: PlatformId.QIITA,
                source_type: SourceType.QIITARSS,
                title: title,
                article_url: link,
                tags: "Qiitaのフィード",
                thumbnail_url: null,
                is_private: false,
                published_at: new Date(published)
            });
        }

        console.log("[Qiita Transform] completed", {
            count: items.length,
        });

        return items;

    } catch (error) {

        console.error(
            "[Qiita Transform] failed",
            error,
        );

        throw error;
    }
};


// =======================
// helper functions
// =======================

function matchTag(xml: string, tag: string): string | null {
    const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`));
    return match ? match[1] : null;
}