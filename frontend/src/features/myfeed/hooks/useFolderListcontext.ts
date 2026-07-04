import { useContext } from "react";
import { FolderListContext } from "../context/FolderListContext";

export const useFolderListContext = () => useContext(FolderListContext);