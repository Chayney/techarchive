import { useContext } from "react";
import { ArticleActionsContext } from "../context/ArticleActionsContext";

export const useArticleActionsContext = () => useContext(ArticleActionsContext);