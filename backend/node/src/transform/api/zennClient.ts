import { PlatformId } from "../../constant/article";
import { fetchZennArticles } from "../../external/api/zennClient";

type ZennTag = {
    name: string;
}

type ZennArticle = {
    title: string;
    path: string;
    liked_count: number;
    og_image: string | null;
    topics?: ZennTag[];
};

// thumbnail_urlはOGP取得となり経路が違うがarticlesのスキーマとして見えるようNULL許容として置いておく
// 1リクエストで100記事を取得する想定の為タイムアウトを起こさないようOGP取得は切り離す
type ArticleCreateInput = {
    platform_id: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    likes_count: number;
};

export const transformZennArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Zenn Transform] start");

    const data: ZennArticle[] = await fetchZennArticles();

    console.log("[Zenn Transform] response:", data);


    const transformed = data.map((article) => ({
        platform_id: PlatformId.ZENN,
        title: article.title,
        article_url: `https://zenn.dev${article.path}`,
        tags: article.topics?.length
            ? JSON.stringify(article.topics.map((topic) => topic.name))
            : null,
        thumbnail_url: article.og_image ?? null,
        is_private: false,
        likes_count: article.liked_count,
    }));

    console.log("[Zenn Transform] result:", transformed);

    return transformed;
};