// Qiita専用のRSS

export const AtomClient = {
    async fetch(url: string) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`RSS fetch error: ${res.status}`);
        }

        const xml = await res.text();

        const items: any[] = [];

        const itemBlocks = xml.split("<entry>").slice(1);

        for (const block of itemBlocks) {
            const itemXml = block.split("</entry>")[0];

            const link = itemXml.match(/<link[^>]+href="([^"]+)"/)?.[1];
            const title = matchTag(itemXml, "title");
            const pubDate = matchTag(itemXml, "updated");

            const creator = matchTag(itemXml, "name");

            items.push({
                link: link ?? "",
                title: title ?? "",
                publishedAt: pubDate ? new Date(pubDate).getTime() : Date.now(),
                authorName: creator ?? null,
                tags: null,
                imageUrl: "",
            });
        }

        return items;
    }
}

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