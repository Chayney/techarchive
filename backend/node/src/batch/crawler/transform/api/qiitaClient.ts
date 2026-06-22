import { PlatformId, SourceType } from "../../../../constant/article";
import { fetchQiitaApiArticles } from "../../external/api/qiitaClient";

type QiitaArticle = {
    title: string;
    url: string;
    likes_count: number;
    created_at: string;
    tags: string;
    og_image_url: string | null;
}

// thumbnail_urlはOGP取得となり経路が違うがarticlesのスキーマとして見えるようNULL許容として置いておく
// 1リクエストで100記事を取得する想定の為タイムアウトを起こさないようOGP取得は切り離す
type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    likes_count: number;
}

export const transformQiitaApiArticles = async (): Promise<ArticleCreateInput[]> => {
    console.log("[Qiita Transform] start");

    const data: QiitaArticle[] = await fetchQiitaApiArticles();

    console.log("[Qiita Transform] raw articles:", data);

    // zennのtagsは記事詳細APIでしか取得できないことによるリクエスト数制限回避のため取得しない
    // qiitaは記事一覧APIで取得できるがzennと統一する
    const transformed = data.map((item) => ({
        platform_id: PlatformId.QIITA,
        source_type: SourceType.QIITAAPI,
        title: item.title,
        article_url: item.url,
        tags: "Qiitaのトレンド",
        thumbnail_url: item.og_image_url ?? null,
        is_private: false,
        likes_count: item.likes_count,
    }));

    console.log("[Qiita Transform] result:", transformed);

    return transformed;
};