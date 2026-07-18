import { useState } from "react";

export const useAllMyFeedTemplate = () => {
    const [folderNameError, setFolderNameError] = useState("");

    const validateFolderName = (folderName: string) => {
        if (!folderName.trim()) {
            setFolderNameError("フォルダ名を入力してください");
            return false;
        }

        setFolderNameError("");
        return true;
    };

    const clearFolderNameError = () => {
        setFolderNameError("");
    };

    return {
        folderNameError,
        validateFolderName,
        clearFolderNameError,
    };
};