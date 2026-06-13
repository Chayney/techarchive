export const RSSClient = {
    async fetch(url: string) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`RSS fetch error: ${res.status}`);
        }

        const xml = await res.text();

        const items: any[] = [];

        const itemBlocks = xml.split("<item>").slice(1);

        for (const block of itemBlocks) {
            const itemXml = block.split("</item>")[0];

            const link = matchTag(itemXml, "link");
            const title = matchTag(itemXml, "title");
            const pubDate = matchTag(itemXml, "pubDate");
            const creator = matchTag(itemXml, "dc:creator");
            const category = matchAllTags(itemXml, "category");
            const enclosure = matchEnclosure(itemXml);

            items.push({
                link: link ?? "",
                title: title ?? "",
                publishedAt: pubDate ? new Date(pubDate).getTime() : 0,
                authorName: creator ?? null,
                tags: category.length > 0 ? category.join(",") : null,
                imageUrl: enclosure ?? "",
            });
        }

        return items;
    },
};

// =======================
// helper functions
// =======================

function matchTag(xml: string, tag: string): string | null {
    const match = xml.match(new RegExp(`<${tag}>(.*?)</${tag}>`));
    return match ? match[1] : null;
}

function matchAllTags(xml: string, tag: string): string[] {
    const matches = [...xml.matchAll(new RegExp(`<${tag}>(.*?)</${tag}>`, "g"))];
    return matches.map((m) => m[1]);
}

function matchEnclosure(xml: string): string | null {
    const match = xml.match(/enclosure[^>]+url="([^"]+)"/);
    return match ? match[1] : null;
}