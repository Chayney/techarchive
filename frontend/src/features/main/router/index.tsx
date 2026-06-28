import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { FeedPage } from "../../../pages/FeedPage"
import { TrendPage } from "../../../pages/TrendPage"
import { BookmarkPage } from "../../../pages/BookmarkPage"
import { FavoritePage } from "../../../pages/FavoritePage"
import { CompanyPage } from "../../../pages/CompanyPage"
import { MyFeedPage } from "../../../pages/MyFeedPage"

export const ArticleRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.FEED} element={<FeedPage />} />
            <Route path={NAVIGATION_LIST.TREND} element={<TrendPage />} />
            <Route path={NAVIGATION_LIST.BOOKMARK} element={<BookmarkPage />} />
            <Route path={NAVIGATION_LIST.COMPANY} element={<CompanyPage />} />
            <Route path={NAVIGATION_LIST.MYFEED} element={<MyFeedPage />} />
            <Route path={NAVIGATION_LIST.FAVORITE} element={<FavoritePage />} />
        </Routes>
    )
}