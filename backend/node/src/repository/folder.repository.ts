import { AppDataSource } from "../config/appDataSource";
import { Feed } from "../domain/entity/feeds.entity";
import { Folder } from "../domain/entity/folders.entity";
import { FolderTagPlatform } from "../domain/entity/folder_tag_platforms.entity";
import { Profile } from "../domain/entity/profiles.entity";

export const getFeedRepositoryData = async () => {
    const db = AppDataSource.getInstance();

    return db.getRepository(Feed).find({
        relations: {
            platform: true,
            article: true,
        },
    });
};

export const getFolderTagPlatformArticles = async (id: number) => {
    const db = AppDataSource.getInstance();

    return db.getRepository(FolderTagPlatform).find({
        where: {
            id,
        },
        relations: {
            platform: {
                feeds: {
                    article: true,
                },
            },
        },
    });
};

export const findProfile = async (userId: string) => {
    const db = AppDataSource.getInstance();

    return db.getRepository(Profile).findOne({
        where: {
            user_id: userId,
        },
    });
};

export const saveFolder = async (name: string, profileId: number) => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Folder);

    const folder = repo.create({
        name,
        profile_id: profileId,
    });

    return repo.save(folder);
};

export const saveFolderTagPlatforms = async (
    folder_id: number,
    items: {
        tag: string;
        platform_id: number;
    }[],
) => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(FolderTagPlatform);

    const entities = items.map((item) =>
        repo.create({
            folder_id,
            tag: item.tag,
            platform_id: item.platform_id,
        }),
    );

    return repo.save(entities);
};

export const findFolders = async (profileId: number) => {
    const db = AppDataSource.getInstance();

    return db.getRepository(Folder).find({
        where: {
            profile_id: profileId,
        },
        relations: {
            folderTagPlatforms: {
                platform: true,
            },
        },
    });
};

export const findFolder = async (id: number) => {
    const db = AppDataSource.getInstance();

    return db.getRepository(Folder).findOne({
        where: {
            id,
        },
    });
};

export const updateFolderData = async (id: number, name: string) => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Folder);

    const folder = await repo.findOne({
        where: {
            id,
        },
    });

    if (!folder) {
        return null;
    }

    folder.name = name;

    return repo.save(folder);
};

export const deleteFolderData = async (id: number) => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Folder);

    const folder = await repo.findOne({
        where: {
            id,
        },
    });

    if (!folder) {
        return null;
    }

    return repo.remove(folder);
};

export const deleteFolderTags = async (folder_id: number) => {
    const db = AppDataSource.getInstance();

    return db.getRepository(FolderTagPlatform).delete({
        folder_id,
    });
};
