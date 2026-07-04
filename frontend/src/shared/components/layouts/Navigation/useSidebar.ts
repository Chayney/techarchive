import { useMemo } from "react"
import { NAVIGATION_PATH } from "../../../const/navigation";
import { Bookmark, Heart, Rss, Star, Building2, Newspaper } from "lucide-react";
import { useFavoriteCategoryContext } from "../../../../features/favorite/hooks/useFavoriteCategoryContext";
import { useFolderListContext } from "../../../../features/myfeed/hooks/useFolderListcontext";

export type Category = {
    id: number;
    name: string;
};

export const useSidebar = () => {
    const mainItems = [
        { title: "Feed", url: NAVIGATION_PATH.FEED, icon: Rss },
        { title: "Trend", url: NAVIGATION_PATH.TREND, icon: Star },
        { title: "Company", url: NAVIGATION_PATH.COMPANY, icon: Building2 },
        { title: "Bookmark", url: NAVIGATION_PATH.BOOKMARK, icon: Bookmark }
    ];

    const { folderList } = useFolderListContext()
    console.log(folderList)
    const feedItems = [
        {
            title: "All",
            url: NAVIGATION_PATH.ALLMYFEED,
            icon: Newspaper,
        },
        ...folderList.map((folder) => ({
            title: folder.name,
            folder_id: folder.id,
            children: folder.folderFeeds.map((folderFeed) => ({
                title: `${folderFeed.feed.platform.name}/${folderFeed.tag}`,
                url: `${NAVIGATION_PATH.MYFEED}/${folder.id}`
            })),
        })),
    ]

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