import { useEffect, useState } from "react";
import { Layout } from "../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Bookmark, BookOpen, Heart, Plus } from "lucide-react";

import { Button } from "../shared/components/ui/button";
import { Input } from "../shared/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../shared/components/ui/dialog";

import { useFavoriteCategoryContext } from "../features/favorite/hooks/FavoriteCategoryContext";

export type Profile = {
    id: number;
    user_id: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Platform = {
    favicon_url: string;
}

export type Article = {
    title: string;
    article_url: string;
    thumbnail_url: string | null;
}

export type TrendArticle = {
    id: number;
    platform_id: number;
    article_id: number;
    likes_count: number;
    tags: string;
    article: Article;
    platform: Platform;
};

export const ArticlePage = () => {
    const { categories } = useFavoriteCategoryContext();
    console.log(categories)
    const [trendArticles, setTrendArticle] = useState<TrendArticle[]>([]);

    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    const [favoriteCategoryMap, setFavoriteCategoryMap] =
        useState<Record<string, boolean>>({});

    const [favoriteArticleMap, setFavoriteArticleMap] =
        useState<Record<number, boolean>>({});

    const [open, setOpen] = useState(false);

    const toggleDropdown = (id: number) => {
        setOpenArticleId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (openArticleId === null) return;

            const dropdown = document.querySelector(
                `[data-dropdown="${openArticleId}"]`
            );

            if (!dropdown) return;

            if (!dropdown.contains(target)) {
                setOpenArticleId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [openArticleId]);

    const toggleFavorite = async (
        articleId: number,
        categoryId: number
    ) => {
        // if (!profileId) return;

        const key = `${articleId}-${categoryId}`;
        const isFavorite = favoriteCategoryMap[key];

        if (isFavorite) {
            setFavoriteCategoryMap((prev) => ({
                ...prev,
                [key]: false,
            }));

            const hasAnyFavorite = Object.entries({
                ...favoriteCategoryMap,
                [key]: false,
            }).some(
                ([k, v]) =>
                    k.startsWith(`${articleId}-`) && v
            );

            setFavoriteArticleMap((prev) => ({
                ...prev,
                [articleId]: hasAnyFavorite,
            }));
        } else {
            setFavoriteCategoryMap((prev) => ({
                ...prev,
                [key]: true,
            }));

            setFavoriteArticleMap((prev) => ({
                ...prev,
                [articleId]: true,
            }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "http://localhost:3000/api/trend/articles"
            );

            const json: TrendArticle[] =
                await res.json();

            setTrendArticle(json);
        };

        fetchData();
    }, []);

    // if (!data || data.articles.length === 0) {
    //     return <div>Loading...</div>;
    // }

    return (
        <Layout>
            {trendArticles.map((article) => (
                <div key={article.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.left}></div>

                        <div className={styles.right}>
                            <a
                                href={article.article.article_url}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.icon}
                            >
                                <BookOpen size={30} />
                            </a>

                            <Bookmark size={30} />

                            <div className="relative">
                                <Heart
                                    size={24}
                                    fill={
                                        favoriteArticleMap[article.id]
                                            ? "currentColor"
                                            : "none"
                                    }
                                    onClick={() =>
                                        toggleDropdown(article.id)
                                    }
                                />

                                {openArticleId === article.id && (
                                    <div
                                        data-dropdown={article.id}
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                        className={styles.dropdown}
                                    >
                                        {categories.map(
                                            (category) => {
                                                const key =
                                                    `${article.id}-${category.id}`;

                                                const isFav =
                                                    favoriteCategoryMap[key] ??
                                                    false;

                                                return (
                                                    <div
                                                        key={category.id}
                                                        className={
                                                            styles.dropdownItem
                                                        }
                                                    >
                                                        <span className="truncate flex-1">
                                                            {
                                                                category.name
                                                            }
                                                        </span>

                                                        <Button
                                                            variant={
                                                                isFav
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            onClick={() =>
                                                                toggleFavorite(
                                                                    article.id,
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            {isFav ? "★" : "☆"}
                                                        </Button>
                                                    </div>
                                                );
                                            }
                                        )}

                                        <div className="mt-2">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() =>
                                                    setOpen(true)
                                                }
                                            >
                                                <Plus size={16} />
                                                <span className="ml-2">
                                                    カテゴリ追加
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className={styles.cardBody}>
                        <div className={styles.avatarHeader}>
                            <img
                                alt=""
                                className={styles.avatar}
                            />
                        </div>

                        <div className={styles.contentArea}>
                            <h2>{article.article.title}</h2>

                            <div className={styles.meta}></div>

                            <div className={styles.tags}></div>
                        </div>
                    </div>
                </div>
            ))}


            {/* mapの外に出す */}
            {/* <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            カテゴリ追加
                        </DialogTitle>
                    </DialogHeader>

                    <Input
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)
                        }
                        placeholder="カテゴリ名を入力"
                    />

                    <Button onClick={handleAddCategory}>
                        追加
                    </Button>
                </DialogContent>
            </Dialog> */}

        </Layout>
    );
};