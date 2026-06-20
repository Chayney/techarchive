import { BrowserRouter } from "react-router-dom"
import { FavoriteCategoryProvider } from "../features/favorite/context/FavoriteCategoryContext"
import { MainContentRouter } from "../features/main/router"

export const Router = () => {
    return (
        <BrowserRouter>
            <FavoriteCategoryProvider>
                <MainContentRouter />
            </FavoriteCategoryProvider>
        </BrowserRouter>
    )
}