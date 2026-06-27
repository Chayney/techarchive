import { createContext, type FC, type ReactNode } from "react";
import { useFavoriteCategory } from "../hooks/useFavoriteCategory";
import type { Category } from "../types/favorite";

type ContextProps = {
    children: ReactNode
}

type FavoriteCategoryContextType = {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const FavoriteCategoryContext = createContext<FavoriteCategoryContextType>({
    categories: [],
    setCategories: () => { }
});

export const FavoriteCategoryProvider: FC<ContextProps> = ({ children }) => {
    const { categories, setCategories } = useFavoriteCategory();

    return (
        <FavoriteCategoryContext.Provider
            value={{
                categories,
                setCategories
            }}
        >
            {children}
        </FavoriteCategoryContext.Provider>
    )
}