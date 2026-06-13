import { useEffect, useState } from "react";
import type { Category } from "../types/article";

export const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/categories");
            const data = await res.json();
            setCategories(data.categories)
        }
        fetchData();
    }, []);

    return {
        categories
    }
}