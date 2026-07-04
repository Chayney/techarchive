import { createContext, type FC, type ReactNode } from "react";
import type { Folder } from "../types/myfeed";
import { useFolderList } from "../hooks/useFolderList";


type ContextProps = {
    children: ReactNode
}

type FolderListContextType = {
    folderList: Folder[];
    setFolderList: React.Dispatch<React.SetStateAction<Folder[]>>;
}

export const FolderListContext = createContext<FolderListContextType>({
    folderList: [],
    setFolderList: () => { }
});

export const FolderListProvider: FC<ContextProps> = ({ children }) => {
    const { folderList, setFolderList } = useFolderList();

    return (
        <FolderListContext.Provider
            value={{
                folderList,
                setFolderList
            }}
        >
            {children}
        </FolderListContext.Provider>
    )
}