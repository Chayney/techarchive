import { useEffect, useState } from "react";
import type { Folder, TagPlatform } from "../types/myfeed";
import { API_URL } from "../../../shared/api/apiClient";
import { getAccessToken, onAuthChange } from "../../../shared/api/supabaseClient";

export const useFolderList = () => {
    const [folderList, setFolderList] = useState<Folder[]>([]);
    const [tagPlatforms, settagPlatform] = useState<TagPlatform[]>([]);

    const fetchFolders = async () => {
        const token = await getAccessToken();

        const res = await fetch(`${API_URL}/folders`, {
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
        });

        if (!res.ok) {
            throw new Error("failed to fetch folders");
        }

        const data: Folder[] = await res.json();

        setFolderList(data);
    };

    useEffect(() => {
        fetchFolders();

        const unsubscribe = onAuthChange(() => {
            fetchFolders();
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchTagPlatforms = async () => {
            try {
                const response = await fetch(`${API_URL}/tags/platforms`);

                if (!response.ok) {
                    throw new Error("feed取得失敗");
                }

                const raw = await response.json();

                const mapped: TagPlatform[] = raw.map((item: any, index: number) => ({
                    id: index + 1,
                    tag: item.tag,
                    platform: item.platform,
                    articles: item.articles
                }));

                settagPlatform(mapped);

            } catch (e) {
                console.error(e);
            }
        };

        fetchTagPlatforms();
    }, []);

    return {
        folderList,
        setFolderList,
        tagPlatforms,
        settagPlatform,
        fetchFolders
    };
};