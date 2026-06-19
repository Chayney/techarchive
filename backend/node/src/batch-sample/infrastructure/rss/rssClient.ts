export const RSSClient = {
    async fetch(url: string) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`RSS fetch error: ${res.status}`);
        }

        const xml = await res.text();

        console.log("\n==============================");
        console.log("📡 RSS FETCHED");
        console.log("URL:", url);
        console.log("XML PREVIEW:");
        console.log(xml.slice(0, 800));

        const items: any[] = [];

        // ==================================================
        // RSS2.0 / Atom 両対応（item / entry）
        // ==================================================
        const isAtom = xml.includes("<entry>");
        const blockTag = isAtom ? "entry" : "item";

        const blocks = xml.split(`<${blockTag}>`).slice(1);

        console.log("\n📦 BLOCK COUNT:", blocks.length);
        console.log("📌 FORMAT:", isAtom ? "ATOM" : "RSS2.0");

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];

            const entryXml = block.split(`</${blockTag}>`)[0];

            console.log("\n------------------------------");
            console.log(`📄 ENTRY ${i}`);
            console.log("RAW BLOCK (preview):");
            console.log(entryXml.slice(0, 500));

            // ==================================================
            // URL抽出（Zenn / Qiita 両対応）
            // ==================================================
            const rawUrl =
                entryXml.match(/<link[^>]*>(.*?)<\/link>/s)?.[1] ||
                entryXml.match(/<link[^>]+href="([^"]+)"/)?.[1] ||
                entryXml.match(/<guid[^>]*>(.*?)<\/guid>/s)?.[1] ||
                "";

            // ==================================================
            // 不可視文字除去（重要）
            // ==================================================
            const cleanUrl = rawUrl
                .replace(/[\u200B-\u200D\uFEFF\u2060]/g, "")
                .trim();

            console.log("🔗 RAW URL MATCH:", rawUrl);
            console.log("🧼 CLEAN URL:", cleanUrl);

            // ==================================================
            // 既存タグ系
            // ==================================================
            const title = matchTag(entryXml, "title") ?? "";
            const updated =
                matchTag(entryXml, "updated") ||
                matchTag(entryXml, "pubDate");
            const author =
                matchTag(entryXml, "name") ||
                matchTag(entryXml, "dc:creator");

            console.log("📝 TITLE:", title);
            console.log("👤 AUTHOR:", author);
            console.log("🕒 UPDATED:", updated);

            // ==================================================
            // URLチェック
            // ==================================================
            if (!cleanUrl) {
                console.log("⚠️ SKIP: missing url");
                continue;
            }

            console.log("✅ FINAL URL:", cleanUrl);

            items.push({
                link: cleanUrl,
                title,
                publishedAt: updated
                    ? new Date(updated).getTime()
                    : Date.now(),
                authorName: author,
                tags: null,
                imageUrl: "",
            });
        }

        console.log("\n🏁 RSS PARSE DONE");
        console.log("TOTAL ITEMS:", items.length);

        return items;
    },
};

// ==================================================
// XML tag matcher
// ==================================================
function matchTag(xml: string, tag: string): string | null {
    const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`, "s"));
    return match ? match[1].trim() : null;
}