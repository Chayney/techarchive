export const useShareArticle = () => {
    const shareArticle = async ({
        title,
        url,
    }: {
        title: string;
        url: string;
    }) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
            }
        } catch (error) {
            // ユーザーがキャンセルした場合
            console.log("Share canceled", error);
        }
    };

    return {
        shareArticle,
    };
};