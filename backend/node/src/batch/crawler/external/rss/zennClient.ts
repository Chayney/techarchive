export const fetchZennRssArticles = async () => {
    console.log("[Zenn] fetch start");

    const response = await fetch("https://zenn.dev/feed");

    console.log("[Zenn] response status:", response.status);

    if (!response.ok) {
        console.error("[Zenn] API Error:", response.status);
        throw new Error(`Zenn API Error: ${response.status}`);
    }

    const data = await response.text();

    console.log("[Zenn] fetched data:", data);

    return data;
};
