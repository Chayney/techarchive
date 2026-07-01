import { useState } from "react"

export const useFeedTemplate = () => {
    const [open, setOpen] = useState(false);
    return {
        open,
        setOpen,
        // onAddFolder,
        
    }
}