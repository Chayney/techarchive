export const useFolder = () => {
    const getPlatformTags = async () => {
        const response = await fetch(
            "http://localhost:3000/api/folder/platform/tags"
        );

        if (!response.ok) {
            throw new Error("platform tag取得失敗");
        }

        return await response.json();
    };

    const saveFolderPlatforms = async (
        folderId: number,
        items: {
            platform_id: number;
            tag: string;
        }[]
    ) => {
        const response = await fetch(
            "http://localhost:3000/api/folder/platforms",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    folder_id: folderId,
                    items
                })
            }
        );

        if (!response.ok) {
            throw new Error("folder platform保存失敗");
        }

        return await response.json();
    };


    const deleteFolderPlatform = async (
        folderId: number,
        platformId: number,
        tag: string
    ) => {

        const response = await fetch(
            "http://localhost:3000/api/folder/platforms",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    folder_id: folderId,
                    platform_id: platformId,
                    tag
                })
            }
        );

        if (!response.ok) {
            throw new Error("folder platform削除失敗");
        }
    };


    const getFolderArticles = async (
        folderId: number
    ) => {

        const response = await fetch(
            `http://localhost:3000/api/folders/${folderId}/articles`
        );

        if (!response.ok) {
            throw new Error("folder記事取得失敗");
        }

        return await response.json();
    };


    return {
        getPlatformTags,
        saveFolderPlatforms,
        deleteFolderPlatform,
        getFolderArticles
    };
};