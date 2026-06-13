import { useEffect, useMemo, useState } from "react"
import { NAVIGATION_PATH } from "../../../const/navigation";
import { Bookmark, Heart, Rss, Star, Building2 } from "lucide-react";

export type Category = {
    id: number;
    profile_id: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type ApiResponse = {
    categories: Category[];
}

export const useSidebar = () => {
    const mainItems = [
        { title: "Feeds", url: NAVIGATION_PATH.FEED, icon: Rss },
        { title: "Trend", url: NAVIGATION_PATH.TREND, icon: Star },
        { title: "Company", url: NAVIGATION_PATH.COMPANY, icon: Building2 },
        { title: "Bookmark", url: NAVIGATION_PATH.BOOKMARK, icon: Bookmark }
    ];

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/categories");
            const data: ApiResponse = await res.json();
            setCategories(data.categories)
        }
        fetchData();
    }, []);

    // レンダリングの度に作成しないようにする
    const favoriteItems = useMemo(
        () =>
            categories.map((category) => ({
                title: category.name,
                url: NAVIGATION_PATH.FAVORITE,
                category_id: category.id,
                icon: Heart,
            })),
        [categories]
    );

    return {
        mainItems,
        favoriteItems
    }
}