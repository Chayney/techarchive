import { useEffect, useState } from "react";
import type { Category } from "../types/favorite";
import { API_URL } from "../../../shared/api/apiClient";
import { getAccessToken, onAuthChange } from "../../../shared/api/supabaseClient";

export const useFavoriteCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessToken();
            const res = await fetch(`${API_URL}/categories`, {
                headers: token ? { Authorization: `Bearer ${token}`} : {}
            });

            const json: Category[] = await res.json();
            
            setCategories(json);
        };

        fetchData();

        // ログイン状態を監視
        const unsubscribe = onAuthChange(() => {
            fetchData();
        });

        return unsubscribe;
    }, []);
    
    return {
        categories,
        setCategories
    }
}