import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../features/auth/contexts/AuthContext"
import { FavoriteCategoryProvider } from "../features/favorite/context/FavoriteCategoryContext"
import { ArticleActionsProvider } from "../features/article/context/ArticleActionsContext"
import { FolderListProvider } from "../features/myfeed/context/FolderListContext"
import { FeaturesRouter } from "../features"

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <FavoriteCategoryProvider>
                    <FolderListProvider>
                        <ArticleActionsProvider>
                            <FeaturesRouter />
                        </ArticleActionsProvider>
                    </FolderListProvider>
                </FavoriteCategoryProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}