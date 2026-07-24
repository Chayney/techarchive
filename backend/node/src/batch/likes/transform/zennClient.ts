import { fetchZennLikesCountFromApi } from "../external/zennClient";
import { ArticleCreateInput, ZennArticle } from "../types";

export const transformZennLikesCount = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Zenn Transform] start");

    const data: ZennArticle[] = await fetchZennLikesCountFromApi();

    console.log("[Zenn Transform] response:", data);

    const transformed = data.map((article) => ({
        article_url: `https://zenn.dev${article.path}`,
        likes_count: article.liked_count,
        published_at: new Date(article.published_at),
    }));

    console.log("[Zenn Transform] result:", transformed);

    return transformed;
};
