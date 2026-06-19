export type QiitaArticle = {
    id: string;
    likes_count: number;
};

type QiitaItemResponse = {
    id: string;
    likes_count: number;
};

export const QiitaClient = {
    async getQiitaArticles(): Promise<QiitaArticle[]> {

        const res = await fetch(
            "https://qiita.com/api/v2/items?page=1&per_page=100"
        );

        if (!res.ok) {
            throw new Error(
                `Qiita API Error: ${res.status}`
            );
        }

        const json: QiitaItemResponse[] =
            await res.json();

        return json.map((item) => ({
            id: item.id,
            likes_count: item.likes_count,
        }));
    },
};