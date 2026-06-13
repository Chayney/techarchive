import { Bookmark, BookOpen, Heart, Plus } from "lucide-react";
import styles from "./style.module.css";
import { Button } from "../../../../shared/components/ui/button";
import type { Article, Category } from "../../types/article";
import { useArticleActions } from "../../hooks/useArticleActions";

type Favorite = {
    articleId: number;
    categoryId: number;
}

type Props = {
    article: Article;
    categories: Category[];
    favorites: Favorite[];
}

export const ArticleCard = ({
    article,
    categories,
    favorites
}: Props) => {
    const isFavorite = favorites.some(favorite => favorite.articleId === article.id);

    const { 
        openArticleId,
        tooltip,
        showTooltip,
        toggleDropdown,
        closeDropdown
    } = useArticleActions();

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.left}>
                    <span className={styles.count}>
                        {article.likesCount}
                    </span>
                    <span className={styles.label}>likes</span>
                </div>

                <div className={styles.right}>
                    <a
                        href={article.articleUrl}
                        rel="noreferrer"
                        className={styles.icon}
                    >
                        <BookOpen size={30} />
                    </a>

                    {/* Bookmark */}
                    {/* <Bookmark
                        size={30}
                        onClick={() => toggleBookmark(article.id)}
                        className={
                            bookmarkMap[article.id]
                                ? styles.bookmarkActive
                                : styles.bookmark
                        }
                    /> */}

                    {/* Favorite */}
                    <div className="relative">
                        <Heart
                            size={24}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(article.id);
                            }}
                            className={
                                favorites.some(favorite => favorite.articleId === article.id)
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
                                onClick={(e) => e.stopPropagation()}
                                className={styles.dropdown}
                            >
                                {categories.map((category) => {
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
                                                    isFavorite
                                                        ? "quaternary"
                                                        : "tertiary"
                                                }
                                                onClick={() => {
                                                    // toggleFavorite(
                                                    //     article.id,
                                                    //     category.id
                                                    // );

                                                    showTooltip(
                                                        article.id,
                                                        isFavorite
                                                            ? "Delete Favorite"
                                                            : "Add Favorite"
                                                    );
                                                }}
                                            >
                                                {isFavorite
                                                    ? "SAVED"
                                                    : "SAVE"}
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.cardBody}>
                <div className={styles.avatarHeader}>
                    <img
                        src={article.thumbnailUrl}
                        alt=""
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.contentArea}>
                    <h3 className={styles.title}>
                        {article.title}
                    </h3>

                    <div className={styles.meta}>
                        <span>
                            🕒{" "}
                            {new Date(
                                article.updatedAt
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className={styles.tags}>
                        {article.tags.split(",").map((tag, i) => (
                            <span key={i} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}