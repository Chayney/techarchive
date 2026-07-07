import { useEffect, useState } from "react";
import type { TagPlatform } from "../types/myfeed";

export const useFolder = () => {
    const [tagPlatforms, settagPlatform] = useState<TagPlatform[]>([]);

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
                settagPlatform(raw)
            } catch (e) {
                console.error(e);
            }
        };

        fetchTagPlatforms();
    }, []);

    const saveFolderTagPlatforms = async (
        folderId: number,
        items: {
            tag: string;
            platform_id: number;
        }[]
    ) => {
        const response = await fetch(
            "http://localhost:3000/api/tags/platforms",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    folder_id: folderId,
                    items,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("folder_tag_platforms保存失敗");
        }

        return await response.json();
    };

    const createFolder = async (folderName: string) => {
        const res = await fetch("http://localhost:3000/api/folder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: folderName })
        });
        if (!res.ok) throw new Error("folder作成失敗");
        return await res.json();
    };

    const updateFolder = async (
        id: number,
        name: string,
        items: { tag: string; platform_id: number }[]
    ) => {
        const res = await fetch(`http://localhost:3000/api/folder/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                items,
            }),
        });

        if (!res.ok) {
            throw new Error("folder update failed");
        }

        return await res.json();
    };

    const deleteFolder = async (id: number) => {
        const res = await fetch(`http://localhost:3000/api/folder/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("folder削除失敗");
        }
    };

    // const deleteFolderFeed = async (id: number) => {
    //     const response = await fetch(`http://localhost:3000/api/folder/feeds/${id}`, {
    //         method: "DELETE",
    //     });

    //     if (!response.ok) {
    //         throw new Error("folder feed削除失敗");
    //     }
    // };

    return {
        tagPlatforms,
        saveFolderTagPlatforms,
        // deleteFolderFeed,
        createFolder,
        updateFolder,
        deleteFolder
    };
};