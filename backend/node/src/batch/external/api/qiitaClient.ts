export const fetchQiitaApiArticles = async () => {
    console.log("[Qiita] fetch start");

    const response = await fetch(
        "https://qiita.com/api/v2/items?page=1&per_page=1"
    );

    console.log("[Qiita] response status:", response.status);

    if (!response.ok) {
        console.error("[Qiita] API Error:", response.status);
        throw new Error(`Qiita API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log("[Qiita] fetched data:", data);

    return data;
};