export const fetchZennArticles = async () => {
    console.log("[Zenn] fetch start");

    const response = await fetch(
        "https://zenn.dev/api/articles?count=1&order=latest&page=1"
    );

    console.log("[Zenn] response status:", response.status);

    if (!response.ok) {
        console.error("[Zenn] API Error:", response.status);
        throw new Error(`Zenn API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("[Zenn] fetched data:", data);

    return data.articles;
};