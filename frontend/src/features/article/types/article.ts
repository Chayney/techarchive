export type Category = {
    id: number;
    profileId: number;
    name: string;
};

export type Article = {
    id: number;
    title: string;
    articleUrl: string;
    thumbnailUrl: string;
    faviconUrl: string;
    tags: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
};