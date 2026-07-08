import { useEffect, useState } from "react";
import type { TagPlatform } from "../types/myfeed";
import { API_URL } from "../../../shared/api/apiClient";
import { getAccessToken } from "../../../shared/api/supabaseClient";

export const useFolder = () => {
    const [tagPlatforms, settagPlatform] = useState<TagPlatform[]>([]);

    useEffect(() => {
        const fetchTagPlatforms = async () => {
            try {
                const response = await fetch(`${API_URL}/tags/platforms`);

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
        const accessToken = await getAccessToken();
        const response = await fetch(`${API_URL}/tags/platforms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                folder_id: folderId,
                items,
            })
        });

        if (!response.ok) {
            throw new Error("folder_tag_platforms保存失敗");
        }

        return await response.json();
    };

    const createFolder = async (folderName: string) => {
        const accessToken = await getAccessToken();
        const res = await fetch(`${API_URL}/folder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
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
        const accessToken = await getAccessToken();
        const res = await fetch(`${API_URL}/folder/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
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
        const accessToken = await getAccessToken();
        const res = await fetch(`${API_URL}/folder/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },
        });

        if (!res.ok) {
            throw new Error("folder削除失敗");
        }
    };

    return {
        tagPlatforms,
        saveFolderTagPlatforms,
        createFolder,
        updateFolder,
        deleteFolder
    };
};