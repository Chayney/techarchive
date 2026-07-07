import { useEffect, useState } from "react";
import type { Category } from "../types/favorite";
import { API_URL } from "../../../shared/api/apiClient";

export const useFavoriteCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API_URL}/categories`);

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