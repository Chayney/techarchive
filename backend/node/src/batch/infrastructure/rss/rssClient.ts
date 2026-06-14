export const RSSClient = {
    async fetch(url: string) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`RSS fetch error: ${res.status}`);
        }

        const xml = await res.text();

        const items: any[] = [];

        const entryBlocks = xml.split("<entry>").slice(1);

        for (const block of entryBlocks) {
            const entryXml = block.split("</entry>")[0];

            const link =
                entryXml.match(/<link[^>]+href="([^"]+)"/)?.[1] ?? "";

            const title = matchTag(entryXml, "title") ?? "";

            const updated = matchTag(entryXml, "updated");

            const author = matchTag(entryXml, "name");

            items.push({
                link,
                title,
                publishedAt: updated
                    ? new Date(updated).getTime()
                    : Date.now(),
                authorName: author,
                tags: null,
                imageUrl: "",
            });
        }

        return items;
    },
};

function matchTag(xml: string, tag: string): string | null {
    const match = xml.match(
        new RegExp(`<${tag}>(.*?)</${tag}>`, "s")
    );

    return match ? match[1].trim() : null;
}