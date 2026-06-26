export const fetchQiitaApiArticles = async () => {
    console.log("[Qiita] fetch start");

    const response1 = await fetch(
        "https://qiita.com/api/v2/items?page=1&per_page=100"
    );

    console.log("[Qiita] response1 status:", response1.status);

    if (!response1.ok) {
        console.error("[Qiita] API Error:", response1.status);
        throw new Error(`Qiita API Error: ${response1.status}`);
    }

    const data1 = await response1.json();

    const data = [...data1];

    console.log("[Qiita] fetched data:", data);

    return data;
};