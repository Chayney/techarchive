export const fetchQiitaRssArticles = async () => {
    console.log("[Qiita] fetch start");

    const response = await fetch("https://qiita.com/popular-items/feed.atom");

    console.log("[Qiita] response status:", response.status);

    if (!response.ok) {
        console.error("[Qiita] API Error:", response.status);
        throw new Error(`Qiita API Error: ${response.status}`);
    }

    const data = await response.text();

    console.log("[Qiita] fetched data:", data);

    return data;
};
