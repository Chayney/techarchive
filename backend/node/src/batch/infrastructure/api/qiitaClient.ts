export const QiitaClient = {
    async fetch(articleId: string) {
        const res = await fetch(
            `https://qiita.com/api/v2/items/${articleId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(
                `Qiita API error: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();

        return {
            likesCount: data.likes_count,
        };
    },
};