export const fetchZennTrending = async () => {
    try {
        const res = await fetch(
            "https://zenn.dev/api/articles?order=like"
        );

        if (!res.ok) {
            throw new Error(`Zenn API error: ${res.status}`);
        }

        const data = await res.json();
        return data.articles;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch Zenn articles: ${error}`);
    }
};