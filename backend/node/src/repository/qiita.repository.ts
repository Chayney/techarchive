export const fetchQiitaItems = async (page = 1, perPage = 100) => {
    const url = new URL("https://qiita.com/api/v2/items");
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));

    const res = await fetch(url.toString());

    if (!res.ok) {
        throw new Error(`Qiita API error: ${res.status}`);
    }

    return await res.json();
};