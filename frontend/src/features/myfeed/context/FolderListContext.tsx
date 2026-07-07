import { createContext, type FC, type ReactNode } from "react";
import type { Folder, TagPlatform } from "../types/myfeed";
import { useFolderList } from "../hooks/useFolderList";

type ContextProps = {
    children: ReactNode
}

type FolderListContextType = {
    folderList: Folder[];
    setFolderList: React.Dispatch<React.SetStateAction<Folder[]>>;

    tagPlatforms: TagPlatform[];
    settagPlatform: React.Dispatch<React.SetStateAction<TagPlatform[]>>;

    fetchFolders: () => Promise<void>;
}

export const FolderListContext = createContext<FolderListContextType>({
    folderList: [],
    setFolderList: () => { },

    tagPlatforms: [],
    settagPlatform: () => { },

    fetchFolders: async () => { }
});

export const FolderListProvider: FC<ContextProps> = ({ children }) => {
    const {
        folderList,
        setFolderList,
        tagPlatforms,
        settagPlatform,
        fetchFolders
    } = useFolderList();

    return (
        <FolderListContext.Provider
            value={{
                folderList,
                setFolderList,
                tagPlatforms,
                settagPlatform,
                // 追加
                fetchFolders
            }}
        >
            {children}
        </FolderListContext.Provider>
    );
};