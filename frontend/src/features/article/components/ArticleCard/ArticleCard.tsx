import { Bookmark, BookOpen, Heart, Plus } from "lucide-react";
import styles from "./style.module.css";
import { Button } from "../../../../shared/components/ui/button";
import { useFavoriteCategoryContext } from "../../../favorite/hooks/FavoriteCategoryContext";
import { useArticleActions } from "../../hooks/useArticleActions";
import { useBookmark } from "../../hooks/useBookmark";
import { useFavorite } from "../../hooks/useFavorite";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
 } from "../../../../shared/components/ui/dialog";
import { Input } from "../../../../shared/components/ui/input";
import { useState } from "react";

type ArticleCardProps = {
    article: {
        id: number;
        title: string;
        article_url: string;
        thumbnail_url?: string | null;
        updated_at: string;
        tags: string;
    };
    likes_count?: number;
    profile_id?: number;
    showBookmark?: boolean;
    showFavorite?: boolean;
};

export const ArticleCard = (article: ArticleCardProps) => {
    const { categories, setCategories } = useFavoriteCategoryContext();
    const { 
        bookmarkMap,
        toggleBookmark,
        isBookmarked
    } = useBookmark();

    const { 
        favoriteCategoryMap,
        favoriteArticleMap,
        toggleFavorite,
        isFavorited,
        isCategoryFavorited
    } = useFavorite();

    const {
        openArticleId,
        tooltip,
        toggleDropdown,
        showTooltip,
        handleAddCategory
    } = useArticleActions();

    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState("");

    const filteredCategories = categories
        .filter((category) => category
        .name
        .toLowerCase()
        .includes(categorySearch.toLowerCase())
    );
    
    // 仮置き
    const profileId = 1;

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
                        {article.likes_count}
                    </span>
                    <span className={styles.label}>likes</span>
                </div>

                <div className={styles.right}>
                    <a
                        href={article.article.article_url}
                        rel="noreferrer"
                        className={styles.icon}
                    >
                        <BookOpen size={30} />
                    </a>

                    {/* Bookmark */}
                    <Bookmark
                        size={30}
                        onClick={() => toggleBookmark(article.article.id)}
                        className={
                            bookmarkMap[article.article.id]
                                ? styles.bookmarkActive
                                : styles.bookmark
                        }
                    />

                    {/* Favorite */}
                    <div className="relative">
                        <Heart
                            size={24}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(article.article.id);
                            }}
                            className={
                                favoriteArticleMap[article.article.id]
                                    ? styles.heartActive
                                    : styles.heart
                            }
                        />

                        {/* Tooltip */}
                        {tooltip?.articleId === article.article.id && (
                            <div className={styles.tooltip}>
                                {tooltip.message}
                            </div>
                        )}

                        {/* Dropdown */}
                        {openArticleId === article.article.id && (
                            <div
                                data-dropdown={article.article.id}
                                onClick={(e) => e.stopPropagation()}
                                className={styles.dropdown}
                            >
                                <Input
                                    value={categorySearch}
                                    onChange={(e) =>
                                        setCategorySearch(e.target.value)
                                    }
                                    placeholder="カテゴリー検索"
                                    className={styles.searchInput}
                                />
                                <div className={styles.categoryList}>
                                    {filteredCategories.map(category => {
                                        return (
                                            <div
                                                key={category.id}
                                                className={styles.dropdownItem}
                                            >
                                                <span>
                                                    {category.name}
                                                </span>

                                                <Button
                                                    // variant={
                                                    //     saved
                                                    //         ? "quaternary"
                                                    //         : "tertiary"
                                                    // }
                                                    onClick={() => {

                                                        // toggleFavorite(
                                                        //     article.id,
                                                        //     category.id
                                                        // );

                                                        // showTooltip(
                                                        //     article.id,
                                                        //     saved
                                                        //         ? "Delete Favorite"
                                                        //         : "Add Favorite"
                                                        // );
                                                    }}
                                                >
                                                    {/* {saved
                                                        ? "SAVED"
                                                        : "SAVE"} */}
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
                                                setCategoryName(e.target.value)
                                            }
                                            placeholder="カテゴリ名を入力"
                                        />

                                        <Button onClick={onAddCategory}>
                                            追加
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className={styles.cardBody}>
                <div className={styles.avatarHeader}>
                    <img
                        src={article.article.thumbnail_url ?? ''}
                        alt=""
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.contentArea}>
                    <h3 className={styles.title}>
                        {article.article.title}
                    </h3>

                    <div className={styles.meta}>
                        <span>
                            🕒{" "}
                            {new Date(
                                article.article.updated_at
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className={styles.tags}>
                        <span className={styles.tag}>
                            {article.article.tags}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

            

    