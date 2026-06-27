import { useState } from "react";

export const useArticleCard = () => {
    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState("");
    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    return {
        categoryName,
        open,
        categorySearch,
        openArticleId,
        setCategoryName,
        setOpen,
        setCategorySearch,
        setOpenArticleId
    }
}