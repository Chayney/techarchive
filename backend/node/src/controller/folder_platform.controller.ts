import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Feed } from "../domain/entity/feeds.entity";
import { FolderPlatform } from "../domain/entity/folder_platforms.entity";
import { getPlatformTags } from "../batch/crawler/repository/folder_platform.repository";

export const getPlatformTagsHandler: RequestHandler = async (_req, res) => {
    try {
        const platformTags = await getPlatformTags();
        res.json(platformTags);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "failed to get platform tags"
        });
    }
};

// ユーザーがフォルダを作りそこで下記で作成したPlatform/Tagを選択
// 作ったフォルダに選択したPlatform/Tagを紐づけ
export const saveFolderPlatformsHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(FolderPlatform);

    try {
        const {
            folder_id,
            items
        } = req.body;


        const folderPlatforms = items.map((item: any) =>
            repo.create({
                folder_id,
                platform_id: item.platform_id,
                tag: item.tag
            })
        );


        const result =
            await repo.save(folderPlatforms);


        res.json(result);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "failed to save folder platforms"
        });
    }
};

export const getFolderArticlesHandler: RequestHandler = async (req, res) => {

    const db = AppDataSource.getInstance();

    const folderPlatformRepo =
        db.getRepository(FolderPlatform);

    const feedRepo =
        db.getRepository(Feed);


    try {

        const folder_id =
            Number(req.params.folder_id);


        const folderPlatforms =
            await folderPlatformRepo.find({
                where: {
                    folder_id
                }
            });


        const feeds =
            await feedRepo.find({
                relations: {
                    article: true,
                    platform: true
                }
            });


        const articles =
            feeds
                .filter(feed => {

                    if (!feed.tags) return false;


                    const feedTags =
                        feed.tags
                            .split(",")
                            .map(tag =>
                                tag.trim().toLowerCase()
                            );


                    return folderPlatforms.some(item => {

                        return (
                            item.platform_id === feed.platform_id &&
                            feedTags.includes(
                                item.tag.toLowerCase()
                            )
                        );

                    });

                })
                .map(feed => feed.article);


        res.json(articles);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "failed to get folder articles"
        });

    }

};