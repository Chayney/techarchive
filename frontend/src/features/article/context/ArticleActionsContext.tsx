import { createContext, type FC, type ReactNode } from "react";
import { useArticleActions } from "../hooks/useArticleActions";
import type { Category } from "../types/article";

type ContextProps = {
    children: ReactNode;
    profileId?: number;
};

type ArticleActionsContextType = {
    bookmarkArticleMap: Record<number, boolean>;
    favoriteCategoryMap: Record<string, boolean>;
    favoriteArticleMap: Record<number, boolean>;

    shareArticle: ({
        title,
        url,
    }: {
        title: string;
        url: string;
    }) => Promise<void>;

    tooltip: {
        articleId: number;
        message: string;
    } | null;

    openArticleId: number | null;

    toggleBookmark: (articleId: number, profileId: number) => Promise<void>;
    toggleFavorite: (articleId: number, categoryId: number) => Promise<void>;
    toggleDropdown: (id: number) => void;
    showTooltip: (articleId: number, message: string) => void;
    setOpenArticleId: (id: number | null) => void;

    handleAddCategory: (
        profileId: number,
        categoryName: string
    ) => Promise<Category>;
};

export const ArticleActionsContext =
    createContext<ArticleActionsContextType>({
        bookmarkArticleMap: {},
        favoriteCategoryMap: {},
        favoriteArticleMap: {},

        shareArticle: async () => { },

        tooltip: null,
        openArticleId: null,

        toggleBookmark: async () => { },
        toggleFavorite: async () => { },

        toggleDropdown: () => { },
        showTooltip: () => { },
        setOpenArticleId: () => { },

        handleAddCategory: async () => ({
            id: 0,
            name: ''
        })
    });

export const ArticleActionsProvider: FC<ContextProps> = ({
    children
}) => {

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
        setOpenArticleId,
        handleAddCategory,
        shareArticle
    } = useArticleActions();

    return (
        <ArticleActionsContext.Provider
            value={{
                bookmarkArticleMap,
                favoriteCategoryMap,
                favoriteArticleMap,
                tooltip,
                openArticleId,
                toggleBookmark,
                toggleFavorite,
                toggleDropdown,
                showTooltip,
                setOpenArticleId,
                handleAddCategory,
                shareArticle
            }}
        >
            {children}
        </ArticleActionsContext.Provider>
    );
};