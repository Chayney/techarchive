import { BookOpen, Bookmark, Heart, Plus } from "lucide-react";
import { Button } from "../../../../shared/components/ui/button";
import styles from "./style.module.css";
import { useArticleCard } from "./useArticleCard";
import { Input } from "../../../../shared/components/ui/input";
import { useFavoriteCategoryContext } from "../../../favorite/hooks/useFavoriteCategoryContext";
import { useArticleActionsContext } from "../../hooks/useArticleActionsContext";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "../../../../shared/components/ui/dialog";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { useIsMobile } from "../../../../shared/components/layouts/BaseLayout/useMobile";

type ArticleCardProps = {
    article: {
        id: number;
        title: string;
        article_url: string;
        thumbnail_url?: string | null;
        published_at: Date;
        tags?: string | null;
    };

    likes_count?: number;

    platform?: {
        name: string;
        favicon_url: string;
    };

    profile_id?: number;
    showBookmark?: boolean;
    showFavorite?: boolean;
};

export const ArticleCard = ({
    article,
    likes_count,
    platform,
}: ArticleCardProps) => {
    const { requireAuth, profileId } = useAuthContext();
    const { categories, setCategories } = useFavoriteCategoryContext();
    const {
        bookmarkArticleMap,
        favoriteCategoryMap,
        favoriteArticleMap,
        tooltip,
        openArticleId,
        toggleBookmark,
        toggleFavorite,
        toggleDropdown,
        showTooltip,
        handleAddCategory,
    } = useArticleActionsContext();

    const {
        categoryName,
        open,
        categorySearch,
        setCategoryName,
        setOpen,
        setCategorySearch,
    } = useArticleCard();

    const isMobile = useIsMobile();

    const filteredCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(categorySearch.toLowerCase())
    );

    const onAddCategory = async () => {
        if (!requireAuth()) return;
        if (!profileId) return;

        const newCategory = await handleAddCategory(
            profileId,
            categoryName
        );

        setCategories((prev) => [...prev, newCategory]);

        setCategoryName("");
        setOpen(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.left}>
                    {platform && (
                        <div className={styles.leftArea}>
                            {likes_count !== undefined ? (
                                <>
                                    <div className={styles.countArea}>
                                        <span className={styles.count}>
                                            {likes_count}
                                        </span>
                                        <span className={styles.label}>
                                            likes
                                        </span>
                                    </div>
                                    <img
                                        src={platform.favicon_url}
                                        alt={platform.name}
                                        className={styles.platformIcon}
                                    />
                                </>
                            ) : (
                                <>
                                    {!isMobile && (
                                        <span className={styles.platformName}>
                                            {platform.name}
                                        </span>
                                    )}

                                    <img
                                        src={platform.favicon_url}
                                        alt={platform.name}
                                        className={styles.platformIcon}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.right}>
                    <a
                        href={article.article_url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.icon}
                    >
                        <BookOpen size={30} />
                    </a>

                    <Bookmark
                        size={30}
                        onClick={() => {
                            if (!requireAuth()) return;
                            const isBookmarked = bookmarkArticleMap[article.id];
                            toggleBookmark(article.id, profileId);
                            showTooltip(
                                article.id,
                                isBookmarked
                                    ? "Delete Bookmark"
                                    : "Add Bookmark"
                            );
                        }}
                        className={
                            bookmarkArticleMap[article.id]
                                ? styles.bookmarkActive
                                : styles.bookmark
                        }
                    />

                    <div className="relative">
                        <Heart
                            size={24}
                            data-dropdown-trigger
                            onClick={() => {
                                if (!requireAuth()) return;
                                toggleDropdown(article.id)
                            }}
                            className={
                                favoriteArticleMap[article.id]
                                    ? styles.heartActive
                                    : styles.heart
                            }
                        />

                        {tooltip?.articleId === article.id && (
                            <div className={styles.tooltip}>
                                {tooltip.message}
                            </div>
                        )}

                        {openArticleId === article.id && (
                            <div
                                data-dropdown={article.id}
                                className={styles.dropdown}
                            >
                                <Input
                                    value={categorySearch}
                                    inputSize="xl"
                                    onChange={(e) =>
                                        setCategorySearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="カテゴリー検索"
                                    className={styles.searchInput}
                                />

                                <div className={styles.categoryList}>
                                    {filteredCategories.map(
                                        (category) => {
                                            const key = `${article.id}-${category.id}`;

                                            return (
                                                <div
                                                    key={category.id}
                                                    className={
                                                        styles.dropdownItem
                                                    }
                                                >
                                                    <span className="truncate flex-1">
                                                        {category.name}
                                                    </span>

                                                    <Button
                                                        variant={
                                                            favoriteCategoryMap[
                                                                key
                                                            ]
                                                                ? "quaternary"
                                                                : "tertiary"
                                                        }
                                                        onClick={() => {
                                                            const isSaved =
                                                                favoriteCategoryMap[
                                                                key
                                                                ];

                                                            toggleFavorite(
                                                                article.id,
                                                                category.id
                                                            );

                                                            showTooltip(
                                                                article.id,
                                                                isSaved
                                                                    ? "Delete Favorite"
                                                                    : "Add Favorite"
                                                            );
                                                        }}
                                                    >
                                                        {favoriteCategoryMap[
                                                            key
                                                        ]
                                                            ? "SAVED"
                                                            : "SAVE"}
                                                    </Button>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>

                                <div
                                    className={
                                        styles.dropdownItem
                                    }
                                    onClick={() =>
                                        setOpen(true)
                                    }
                                >
                                    カテゴリーを追加
                                    <Plus />
                                </div>
                            </div>
                        )}

                        <Dialog
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <DialogContent>
                                <DialogTitle>
                                    カテゴリーの追加
                                </DialogTitle>

                                <Input
                                    value={categoryName}
                                    variant="primary"
                                    inputSize="xl"
                                    onChange={(e) =>
                                        setCategoryName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="カテゴリー名を入力"
                                />

                                <Button
                                    variant="secondary"
                                    onClick={onAddCategory}
                                >
                                    追加
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <div className={styles.cardBody}>
                <div className={styles.avatarHeader}>
                    {article.thumbnail_url ? (
                        <img
                            src={article.thumbnail_url}
                            alt=""
                            className={styles.avatar}
                        />
                    ) : (
                        <div className={styles.noImage}>
                            No Image
                        </div>
                    )}
                </div>

                <div className={styles.contentArea}>
                    <h3 className={styles.title}>
                        {article.title}
                    </h3>

                    <div className={styles.meta}>
                        <span>
                            🕒{" "}
                            {new Date(
                                article.published_at
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    {article.tags && (
                        <div className={styles.tags}>
                            {article.tags
                                .split(",")
                                .map((tag) => tag.trim())
                                .filter(Boolean)
                                .map((tag) => (
                                    <span
                                        key={tag}
                                        className={styles.tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};