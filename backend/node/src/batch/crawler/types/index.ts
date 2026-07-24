export type FeedInput = {
    id: number;
    platform_id: number;
    tags: string | null;
};

export type TrendInput = {
    id: number;
    platform_id: number;
    likes_count: number;
    tags: string | null;
};

export type QiitaTag = {
    name: string;
    versions: string[];
};

export type ZennTopic = {
    id: number;
    name: string;
    slug: string;
    image_url: string | null;
    display_name: string;
};

export type QiitaArticle = {
    title: string;
    url: string;
    likes_count: number;
    created_at: Date;
    tags: string;
    og_image_url: string | null;
};

export type ZennArticle = {
    title: string;
    path: string;
    liked_count: number;
    published_at: Date;
    og_image: string | null;
    topics: string;
};

export type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
};

export type QiitaApiArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    likes_count: number;
    published_at: Date;
};

export type ZennApiArticleCreateInput = {
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

export type QiitaRssArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    published_at: Date;
};

export type ZennRssArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
    published_at: Date;
};
