import { AuthRouter } from "./auth/router"
import { FavoriteRouter } from "./favorite/router"
import { MainRouter } from "./main/router"
import { MyFeedRouter } from "./myfeed/router"

export const FeaturesRouter = () => {
    return (
        <>
            <MainRouter />
            <MyFeedRouter />
            <FavoriteRouter />
            <AuthRouter />
        </>
    )
}