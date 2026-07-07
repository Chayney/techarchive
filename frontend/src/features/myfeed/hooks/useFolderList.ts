import { useEffect, useState } from "react";
import type { Folder, TagPlatform } from "../types/myfeed";

export const useFolderList = () => {
    const [folderList, setFolderList] = useState<Folder[]>([]);
    const [tagPlatforms, settagPlatform] = useState<TagPlatform[]>([]);

    useEffect(() => {
        const fetchFolders = async () => {
            const res = await fetch("http://localhost:3000/api/folders");

            if (!res.ok) {
                throw new Error("failed to fetch folders");
            }

            const data: Folder[] = await res.json();
            setFolderList(data);
        };

        fetchFolders();
    }, []);

    useEffect(() => {
        const fetchTagPlatforms = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/tags/platforms"
                );

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
        settagPlatform
    };
};