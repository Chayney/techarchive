import { fetchZennLikesCountFromApi } from "../external/zennClient";

type ZennArticle = {
    path: string;
    liked_count: number;
    published_at: Date;
};

type ArticleCreateInput = {
    article_url: string;
    likes_count: number;
    published_at: Date;
};

export const transformZennLikesCount = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Zenn Transform] start");

    const data: ZennArticle[] = await fetchZennLikesCountFromApi();

    console.log("[Zenn Transform] response:", data);

    const transformed = data.map((article) => ({
        article_url: `https://zenn.dev${article.path}`,
        likes_count: article.liked_count,
        published_at: new Date(article.published_at)
    }));

    console.log("[Zenn Transform] result:", transformed);

    return transformed;
};