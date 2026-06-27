import { BrowserRouter } from "react-router-dom"
import { AuthRouter } from "../features/auth/router/AuthRouter"
import { AuthProvider } from "../features/auth/contexts/AuthContext"
import { ArticleRouter } from "../features/main/router"
import { FavoriteCategoryProvider } from "../features/favorite/context/FavoriteCategoryContext"
import { ArticleActionsProvider } from "../features/article/context/ArticleActionsContext"

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <FavoriteCategoryProvider>
                    <ArticleActionsProvider>
                        <AuthRouter />
                        <ArticleRouter />
                    </ArticleActionsProvider>
                </FavoriteCategoryProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}