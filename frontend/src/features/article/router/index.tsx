import { Route, Routes } from "react-router-dom"
import { FavoritePage } from "../../../pages/FavoritePage"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { ArticlePage } from "../../../pages/ArticlePage"

export const ArticleRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.FEED} element={<ArticlePage />} />
            <Route path={NAVIGATION_LIST.FAVORITE} element={<FavoritePage />}/>
        </Routes>
    )
}