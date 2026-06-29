export type Category = {
    id: number;
    name: string;
}

export type Article = {
    id: number
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;
}

export type FavoriteArticle = {
    id: number;
    article_id: number;
    category_id: number;
    category: Category;
    article: Article
};