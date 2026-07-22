import { AppDataSource } from "../config/appDataSource";
import { Feed } from "../domain/entity/feeds.entity";
import { FolderTagPlatform } from "../domain/entity/folder_tag_platforms.entity";
import { Folder } from "../domain/entity/folders.entity";
import { Profile } from "../domain/entity/profiles.entity";
import { FolderTagPlatformItem } from "../types/folder";

const db = () => AppDataSource.getInstance();

export const findFeeds = async () => {
    return db()
        .getRepository(Feed)
        .find({
            relations: {
                platform: true,
                article: true,
            },
        });
};

export const findFolderArticles = async (id: number) => {
    return db()
        .getRepository(FolderTagPlatform)
        .find({
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

export const findProfileByUserId = async (userId: string) => {
    return db()
        .getRepository(Profile)
        .findOne({
            where: {
                user_id: userId,
            },
        });
};

export const saveFolder = async (data: Partial<Folder>) => {
    const repo = db().getRepository(Folder);

    return repo.save(repo.create(data));
};

export const saveFolderTagPlatforms = async (items: FolderTagPlatformItem[]) => {
    const repo = db().getRepository(FolderTagPlatform);

    const entities = items.map((item) =>
        repo.create({
            folder_id: item.folder_id,
            tag: item.tag,
            platform_id: item.platform_id,
        }),
    );

    return repo.save(entities);
};

export const findFolders = async (profileId: number) => {
    return db()
        .getRepository(Folder)
        .find({
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

export const findFolderById = async (id: number) => {
    return db().getRepository(Folder).findOne({
        where: { id },
    });
};

export const updateFolderEntity = async (folder: Folder) => {
    return db().getRepository(Folder).save(folder);
};

export const deleteFolderTags = async (folderId: number) => {
    return db().getRepository(FolderTagPlatform).delete({
        folder_id: folderId,
    });
};

export const removeFolder = async (folder: Folder) => {
    return db().getRepository(Folder).remove(folder);
};
