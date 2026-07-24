import { transformQiitaLikesCount } from "../transform/qiitaClient";
import { QiitaArticle } from "../types";

export const fetchQiitaLikesCountFromApi = async () => {
    console.log("[Qiita] fetch start");

    const data = [];

    for (let page = 1; page <= 50; page++) {
        const response = await fetch(`https://qiita.com/api/v2/items?page=${page}&per_page=100`);

        console.log(`[Qiita] response${page} status:`, response.status);

        if (!response.ok) {
            throw new Error(`Qiita API Error: ${response.status}`);
        }

        const json: QiitaArticle[] = await response.json();

        data.push(...transformQiitaLikesCount(json));
    }

    console.log("[Qiita] fetched count:", data.length);

    return data;
};
