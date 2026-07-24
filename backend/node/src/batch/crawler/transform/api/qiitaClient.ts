import { PlatformId, SourceType } from "../../../../constant/article";
import { fetchQiitaApiArticles } from "../../external/api/qiitaClient";
import { QiitaApiArticleCreateInput, QiitaArticle } from "../../types";

// thumbnail_urlはOGPのため別経路で取得出来るようNULL許容として置いておく
// 1リクエストで100記事を取得する想定の為タイムアウトを起こさないようOGP取得は切り離す
export const transformQiitaApiArticles = async (): Promise<QiitaApiArticleCreateInput[]> => {
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
        published_at: new Date(item.created_at),
    }));

    console.log("[Qiita Transform] result:", transformed);

    return transformed;
};
