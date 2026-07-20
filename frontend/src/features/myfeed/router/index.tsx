import { Route, Routes } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../shared/const/navigation"
import { AllMyFeedPage } from "../../../pages/AllMyFeedPage"
import { MyFeedPage } from "../../../pages/MyFeedPage"
import { MyFolderPage } from "../../../pages/MyFolderPage"

export const MyFeedRouter = () => {
    return (
        <Routes>
            <Route path={NAVIGATION_LIST.ALLMYFEED} element={<AllMyFeedPage />} />
            <Route path={NAVIGATION_LIST.MYFOLDER} element={<MyFolderPage />} />
            <Route path={NAVIGATION_LIST.MYFEED} element={<MyFeedPage />} />
        </Routes>
    )
}