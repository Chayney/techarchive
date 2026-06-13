export const getOgpImage = async (url: string): Promise<string | null> => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 10_000); // 10秒

    try {
        const res = await fetch(url, {
            signal: controller.signal,
        });

        const html = await res.text();

        // og:image を抽出
        const match =
            html.match(
                /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
            ) ||
            html.match(
                /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
            );

        if (match?.[1]) {
            return match[1];
        }

        return null;
    } catch (err) {
        return null;
    } finally {
        clearTimeout(timeout);
    }
};