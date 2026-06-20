import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { TrendPage } from "../../../pages/TrendPage"

export const MainContentRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.TREND} element={<TrendPage />} />
        </Routes>
    )
}