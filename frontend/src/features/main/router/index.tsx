import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { FeedPage } from "../../../pages/FeedPage"
import { TrendPage } from "../../../pages/TrendPage"
import { BookmarkPage } from "../../../pages/BookmarkPage"
import { CompanyPage } from "../../../pages/CompanyPage"

export const MainRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.FEED} element={<FeedPage />} />
            <Route path={NAVIGATION_LIST.TREND} element={<TrendPage />} />
            <Route path={NAVIGATION_LIST.BOOKMARK} element={<BookmarkPage />} />
            <Route path={NAVIGATION_LIST.COMPANY} element={<CompanyPage />} />
        </Routes>
    )
}