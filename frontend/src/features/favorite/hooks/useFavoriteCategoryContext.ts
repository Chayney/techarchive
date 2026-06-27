import { useContext } from "react";
import { FavoriteCategoryContext } from "../context/FavoriteCategoryContext";

export const useFavoriteCategoryContext = () => useContext(FavoriteCategoryContext);