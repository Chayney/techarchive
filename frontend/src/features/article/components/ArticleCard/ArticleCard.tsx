import { BookOpen, Bookmark, Heart, Plus } from "lucide-react";
import { Button } from "../../../../shared/components/ui/button";
import styles from "./style.module.css";
import { useArticleCard } from "./useArticleCard";
import { Input } from "../../../../shared/components/ui/input";
import { useFavoriteCategoryContext } from "../../../favorite/hooks/useFavoriteCategoryContext";
import { useArticleActionsContext } from "../../hooks/useArticleActionsContext";
import { Dialog, DialogContent, DialogTitle } from "../../../../shared/components/ui/dialog";

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
    profile_id?: number;
    showBookmark?: boolean;
    showFavorite?: boolean;
};

export const ArticleCard = ({
    article,
    likes_count,
    profile_id,
    showBookmark,
    showFavorite
}: ArticleCardProps) => {
    const { categories, setCategories } = useFavoriteCategoryContext();
    const { 
        bookmarkMap,
        favoriteCategoryMap,
        favoriteArticleMap,
        tooltip,
        openArticleId,
        toggleBookmark,
        toggleFavorite,
        toggleDropdown,
        showTooltip,
        setOpenArticleId,
        handleAddCategory
    } = useArticleActionsContext();
    
    // 仮置き
    const profileId = 1;

    const { 
        categoryName,
        open,
        categorySearch,
        setCategoryName,
        setOpen,
        setCategorySearch
    } = useArticleCard();

    const filteredCategories = categories
        .filter((category) => category
            .name
            .toLowerCase()
            .includes(categorySearch.toLowerCase())
        );

    const onAddCategory = async () => {
        if (!profileId) return;
        const newCategory = await handleAddCategory(profileId, categoryName);
        setCategories((prev) => [
            ...prev,
            newCategory,
        ]);
        setCategoryName('');
        setOpen(false);
    };
    
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.left}>
                    <span className={styles.count}>
                        {likes_count}
                    </span>
                    <span className={styles.label}>likes</span>
                </div>

                <div className={styles.right}>
                    <a
                        href={article.article_url}
                        rel="noreferrer"
                        className={styles.icon}
                    >
                        <BookOpen size={30} />
                    </a>

                    {/* Bookmark */}
                    {/* <Bookmark
                        size={30}
                        onClick={() => toggleBookmark(article.article.id)}
                        className={
                            bookmarkMap[article.article.id]
                                ? styles.bookmarkActive
                                : styles.bookmark
                        }
                    /> */}

                    {/* Favorite */}
                    <div className="relative">
                        <Heart
                            size={24}
                            data-dropdown-trigger
                            onClick={() => {
                                toggleDropdown(article.id);
                            }}
                            className={
                                favoriteArticleMap[article.id]
                                    ? styles.heartActive
                                    : styles.heart
                            }
                        />

                        {/* Tooltip */}
                        {tooltip?.articleId === article.id && (
                            <div className={styles.tooltip}>
                                {tooltip.message}
                            </div>
                        )}

                        {/* Dropdown */}
                        {openArticleId === article.id && (
                            <div
                                data-dropdown={article.id}                             
                                className={styles.dropdown}
                            >
                                <Input
                                    value={categorySearch}
                                    inputSize="xl"
                                    onChange={(e) =>
                                        setCategorySearch(e.target.value)
                                    }
                                    placeholder="カテゴリー検索"
                                    className={styles.searchInput}
                                />
                                <div className={styles.categoryList}>
                                    {filteredCategories.map((category) => {
                                        const key = `${article.id}-${category.id}`;

                                        return (
                                            <div
                                                key={category.id}
                                                className={styles.dropdownItem}
                                            >
                                                <span className="truncate flex-1">
                                                    {category.name}
                                                </span>

                                                <Button
                                                    variant={
                                                        favoriteCategoryMap[key]
                                                            ? "quaternary"
                                                            : "tertiary"
                                                    }
                                                    onClick={() => {
                                                        const isSaved =
                                                            favoriteCategoryMap[key];

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
                                                    {favoriteCategoryMap[key]
                                                        ? "SAVED"
                                                        : "SAVE"}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className={styles.dropdownItem}
                                    onClick={() => setOpen(true)}
                                >
                                    カテゴリーを追加<Plus />
                                </div>
                            </div>
                        )}
                        <Dialog
                            open={open}
                            onOpenChange={setOpen}
                        >
                            <DialogContent>
                                <DialogTitle>カテゴリーの追加</DialogTitle>
                                <Input
                                    value={categoryName}
                                    variant="primary"
                                    inputSize="xl"
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
                                    placeholder="カテゴリー名を入力"
                                />
                                <Button
                                    variant="secondary"       
                                    onClick={onAddCategory}>
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
                            {new Date(article.published_at).toLocaleDateString()}
                        </span>
                    </div>

                    <div className={styles.tags}>
                        <span className={styles.tag}>
                            {article.tags}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};