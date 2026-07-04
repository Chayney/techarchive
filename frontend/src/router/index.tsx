import { BrowserRouter } from "react-router-dom"
import { AuthRouter } from "../features/auth/router/AuthRouter"
import { AuthProvider } from "../features/auth/contexts/AuthContext"
import { ArticleRouter } from "../features/main/router"
import { FavoriteCategoryProvider } from "../features/favorite/context/FavoriteCategoryContext"
import { ArticleActionsProvider } from "../features/article/context/ArticleActionsContext"
import { FolderListProvider } from "../features/myfeed/context/FolderListContext"

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <FavoriteCategoryProvider>
                    <FolderListProvider>
                        <ArticleActionsProvider>
                            <AuthRouter />
                            <ArticleRouter />
                        </ArticleActionsProvider>
                    </FolderListProvider>
                </FavoriteCategoryProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}