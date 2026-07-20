import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { FavoritePage } from "../../../pages/FavoritePage"

export const FavoriteRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.FAVORITE} element={<FavoritePage />} />
        </Routes>
    )
}