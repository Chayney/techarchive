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

export type Profile = {
    id: number;
    user_id: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Category = {
    id: number;
    profile_id: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Article = {
    id: number;
    platform_id: number | null;
    title: string;
    description: string;
    article_url: string;
    published_at: string | null;
    author_name: string | null;
    tags: string | null;
    thumbnail_url: string;
    is_eng: boolean;
    is_private: boolean;
    createdAt: string;
    updatedAt: string;
};

export type InitDataResponse = {
    users: Profile;
    categories: Category[];
    articles: Article[];
};

export const ArticlePage = () => {
    const [data, setData] = useState<InitDataResponse | null>(null);

    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    const [favoriteCategoryMap, setFavoriteCategoryMap] =
        useState<Record<string, boolean>>({});

    const [favoriteArticleMap, setFavoriteArticleMap] =
        useState<Record<number, boolean>>({});

    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    // const profileId = data?.users.id;

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

    const handleAddCategory = async () => {
        if (!data) return;

        try {
            const res = await fetch(
                "http://localhost:3000/api/categories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        profile_id: data.users.id,
                        name: categoryName,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("カテゴリ作成失敗");
            }

            const newCategory: Category =
                await res.json();

            setData((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    categories: [
                        ...prev.categories,
                        newCategory,
                    ],
                };
            });

            setCategoryName("");
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "http://localhost:3000/api/init-data"
            );

            const json: InitDataResponse =
                await res.json();

            setData(json);
        };

        fetchData();
    }, []);

    if (!data || data.articles.length === 0) {
        return <div>Loading...</div>;
    }

    const article = data.articles[0];

    return (
        <Layout>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.left}></div>

                    <div className={styles.right}>
                        <a
                            href={article.article_url}
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
                                    favoriteArticleMap[
                                        article.id
                                    ]
                                        ? "currentColor"
                                        : "none"
                                }
                                onClick={() =>
                                    toggleDropdown(
                                        article.id
                                    )
                                }
                            />

                            {openArticleId ===
                                article.id && (
                                    <div
                                        data-dropdown={
                                            article.id
                                        }
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                        className={
                                            styles.dropdown
                                        }
                                    >
                                        {data.categories.map(
                                            (
                                                category
                                            ) => {
                                                const key = `${article.id}-${category.id}`;

                                                const isFav =
                                                    favoriteCategoryMap[
                                                    key
                                                    ] ??
                                                    false;

                                                return (
                                                    <div
                                                        key={
                                                            category.id
                                                        }
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
                                                            {isFav
                                                                ? "★"
                                                                : "☆"}
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
                                                    setOpen(
                                                        true
                                                    )
                                                }
                                            >
                                                <Plus
                                                    size={
                                                        16
                                                    }
                                                />
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
                    <div
                        className={
                            styles.avatarHeader
                        }
                    >
                        <img
                            alt=""
                            className={
                                styles.avatar
                            }
                        />
                    </div>

                    <div
                        className={
                            styles.contentArea
                        }
                    >
                        <h2>{article.title}</h2>

                        <p>
                            {
                                article.description
                            }
                        </p>

                        <div
                            className={
                                styles.meta
                            }
                        ></div>

                        <div
                            className={
                                styles.tags
                            }
                        ></div>
                    </div>
                </div>
            </div>

            <Dialog
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
                            setCategoryName(
                                e.target.value
                            )
                        }
                        placeholder="カテゴリ名を入力"
                    />

                    <Button
                        onClick={
                            handleAddCategory
                        }
                    >
                        追加
                    </Button>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};