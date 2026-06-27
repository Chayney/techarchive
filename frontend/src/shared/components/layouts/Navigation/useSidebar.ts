import { useMemo } from "react"
import { NAVIGATION_PATH } from "../../../const/navigation";
import { Bookmark, Heart, Rss, Star, Building2, Newspaper } from "lucide-react";
import { useFavoriteCategoryContext } from "../../../../features/favorite/hooks/useFavoriteCategoryContext";

export type Category = {
    id: number;
    name: string;
};

export const useSidebar = () => {
    const mainItems = [
        { title: "Feeds", url: NAVIGATION_PATH.FEED, icon: Rss },
        { title: "Trend", url: NAVIGATION_PATH.TREND, icon: Star },
        { title: "Company", url: NAVIGATION_PATH.COMPANY, icon: Building2 },
        { title: "Bookmark", url: NAVIGATION_PATH.BOOKMARK, icon: Bookmark }
    ];

    const feedItems = [
        {
            title: "All",
            icon: Newspaper
        },
        {
            title: "Next.js",
            category_id: 1,
            children: [
                {
                    title: "Qiita",
                    service: "qiita"
                },
                {
                    title: "Zenn",
                    service: "zenn"
                }
            ]
        },
        {
            title: "React",
            category_id: 2,
            children: [
                {
                    title: "Qiita",
                    service: "qiita"
                },
                {
                    title: "Zenn",
                    service: "zenn"
                }
            ]
        },
        {
            title: "TypeScript",
            category_id: 3,
            children: [
                {
                    title: "Qiita",
                    service: "qiita"
                },
                {
                    title: "Zenn",
                    service: "zenn"
                }
            ]
        },
        {
            title: "GCP",
            category_id: 4,
            children: [
                {
                    title: "Qiita",
                    service: "qiita"
                },
                {
                    title: "Zenn",
                    service: "zenn"
                }
            ]
        },
        {
            title: "AWS",
            category_id: 5,
            children: [
                {
                    title: "Qiita",
                    service: "qiita"
                },
                {
                    title: "Zenn",
                    service: "zenn"
                }
            ]
        }
    ];

    const { categories } = useFavoriteCategoryContext();

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
        feedItems,
        favoriteItems
    }
}