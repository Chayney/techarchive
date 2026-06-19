import { articles } from "../service/articles.service";
import { AppDataSource } from "../../config/appDataSource";
import { Article } from "../../domain/entity/articles.entity";

// articlesテーブルから記事タイトルかIDを取得する

// 重複記事は保存しない処理を加える
export const saveArticles = async () => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Article);

    try {
        const data = await articles();
        return await repo.save(data);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to save article: ${error}`);
    }
};