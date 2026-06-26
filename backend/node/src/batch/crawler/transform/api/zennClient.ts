import { PlatformId, SourceType } from "../../../../constant/article";
import { fetchZennApiArticles } from "../../external/api/zennClient";

type ZennArticle = {
    title: string;
    path: string;
    liked_count: number;
    published_at: Date;
    og_image: string | null;
    topics: string;
};

// thumbnail_urlはOGP取得となり経路が違うがarticlesのスキーマとして見えるようNULL許容として置いておく
// 1リクエストで100記事を取得する想定の為タイムアウトを起こさないようOGP取得は切り離す
type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string;
    thumbnail_url: string | null;
    is_private: boolean;
    likes_count: number;
    published_at: Date;
};

export const transformZennApiArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Zenn Transform] start");

    const data: ZennArticle[] = await fetchZennApiArticles();

    console.log("[Zenn Transform] response:", data);

    // zennのtagsは記事詳細APIでしか取得できないことによるリクエスト数制限回避のため取得しない
    const transformed = data.map((article) => ({
        platform_id: PlatformId.ZENN,
        source_type: SourceType.ZENNAPI,
        title: article.title,
        article_url: `https://zenn.dev${article.path}`,
        tags: "Zennのトレンド",
        thumbnail_url: article.og_image ?? null,
        is_private: false,
        likes_count: article.liked_count,
        published_at: new Date(article.published_at)
    }));

    console.log("[Zenn Transform] result:", transformed);

    return transformed;
};