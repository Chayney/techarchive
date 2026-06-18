import { PlatformId } from "../../constant/article";
import { fetchQiitaArticles } from "../../external/api/qiitaClient";

type QiitaTag = {
    name: string;
}

type QiitaArticle = {
    title: string;
    url: string;
    likes_count: number;
    created_at: string;
    tags?: QiitaTag[];
    og_image_url: string | null;
}

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
}

export const transformQiitaArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Qiita Transform] start");

    const data: QiitaArticle[] = await fetchQiitaArticles();

    console.log("[Qiita Transform] raw articles:", data);

    const transformed = data.map((item) => ({
        platform_id: PlatformId.QIITA,
        title: item.title,
        article_url: item.url,
        tags: item.tags?.length
            ? JSON.stringify(item.tags.map((tag) => tag.name))
            : null,
        thumbnail_url: item.og_image_url ?? null,
        is_private: false,
        likes_count: item.likes_count,
    }));

    console.log("[Qiita Transform] result:", transformed);

    return transformed;
};