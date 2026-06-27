import { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/hooks/useAuthContext";
import type {
    
    Bookmarks
} from "../types/article";
import { supabase } from "../../../shared/lib/supabaseClient";
import { useArticleData } from "./useArticleData";

export const useBookmark = (keyword: string) => {
    const { profileId, isAuth } = useAuthContext();

    const { articles, categories } = useArticleData(keyword);

    const [bookmarkArticleMap, setBookmarkArticleMap] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);

   

    return {
        bookmarkArticleMap,
        categories,
        profileId,
        loading,
        isAuth
    };
};