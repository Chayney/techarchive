export enum TrendPlatformType {
    NONE = 0,
    QIITA = 1,
    ZENN = 2,
    HATENA = 3,
}

// articlesに取得元を置く
export const SourceType = {
    QIITAAPI: 1,
    ZENNAPI: 2,
    QIITARSS: 3,
    ZENNRSS: 4
}

// articlesにプラットフォームを置く
export const PlatformId = {
    QIITA: 1,
    ZENN: 2
}