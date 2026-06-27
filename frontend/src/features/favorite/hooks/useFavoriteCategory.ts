import { useEffect, useState } from "react";
import type { Category } from "../types/favorite";

export const useFavoriteCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "http://localhost:3000/api/categories"
            );

            const json: Category[] = await res.json();
            
            setCategories(json);
        };

        fetchData();
    }, []);
    
    return {
        categories,
        setCategories
    }
}