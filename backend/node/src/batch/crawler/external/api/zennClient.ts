export const fetchZennApiArticles = async () => {
    console.log("[Zenn] fetch start");

    const [response1, response2, response3] = await Promise.all([
        fetch("https://zenn.dev/api/articles?count=10&order=latest&page=1"),
        fetch("https://zenn.dev/api/articles?count=10&order=latest&page=2"),
        fetch("https://zenn.dev/api/articles?count=10&order=latest&page=3"),
    ]);

    console.log("[Zenn] response1 status:", response1.status);
    console.log("[Zenn] response2 status:", response2.status);
    console.log("[Zenn] response3 status:", response3.status);

    if (!response1.ok) {
        console.error("[Zenn] API Error:", response1.status);
        throw new Error(`Zenn API Error: ${response1.status}`);
    }

    if (!response2.ok) {
        console.error("[Zenn] API Error:", response2.status);
        throw new Error(`Zenn API Error: ${response2.status}`);
    }

    if (!response3.ok) {
        console.error("[Zenn] API Error:", response3.status);
        throw new Error(`Zenn API Error: ${response3.status}`);
    }

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    const data = {
        articles: [...data1.articles, ...data2.articles, ...data3.articles],
    };

    console.log("[Zenn] fetched data:", data);

    return data.articles;
};
