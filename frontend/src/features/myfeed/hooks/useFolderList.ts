import { useEffect, useState } from "react";
import type { Folder } from "../types/myfeed";

export const useFolderList = () => {
    const [folderList, setFolderList] = useState<Folder[]>([]);

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
    
    return {
        folderList,
        setFolderList
    }
}