import { BrowserRouter } from "react-router-dom"
import { ArticleRouter } from "../features/article/router"

export const Router = () => {
    return (
        <BrowserRouter>
            <ArticleRouter />
        </BrowserRouter>
    )
}