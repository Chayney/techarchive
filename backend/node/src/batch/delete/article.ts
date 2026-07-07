import { In } from "typeorm";
import { AppDataSource } from "../../config/appDataSource";
import { Article } from "../../domain/entity/articles.entity";
import { Bookmark } from "../../domain/entity/bookmarks.entity";
import { Favorite } from "../../domain/entity/favorites.entity";

export const deleteArticles = async () => {
    const db = AppDataSource.getInstance();

    const articleRepo = db.getRepository(Article);
    const bookmarkRepo = db.getRepository(Bookmark);
    const favoriteRepo = db.getRepository(Favorite);

    console.log("[deleteArticles] start");

    // 現在の記事数を取得
    const articleCount = await articleRepo.count();

    console.log(`[deleteArticles] article count: ${articleCount}`);

    // 5000件以下なら何もしない
    if (articleCount <= 5000) {
        console.log("[deleteArticles] article count <= 5000. skip");
        return;
    }

    // 削除すべき件数
    const deleteCount = articleCount - 5000;

    console.log(`[deleteArticles] delete target count: ${deleteCount}`);

    // Bookmark・Favoriteされている記事IDを取得
    const [bookmarks, favorites] = await Promise.all([
        bookmarkRepo.find({
            select: {
                article_id: true,
            },
        }),
        favoriteRepo.find({
            select: {
                article_id: true,
            },
        }),
    ]);

    // 削除対象外の記事ID
    const protectedIds = [
        ...new Set([
            ...bookmarks.map((b) => b.article_id),
            ...favorites.map((f) => f.article_id),
        ]),
    ];

    // 削除対象の記事を古い公開日順に取得
    const qb = articleRepo
        .createQueryBuilder("article")
        .select(["article.id"])
        .orderBy("article.published_at", "ASC")
        .take(deleteCount);

    if (protectedIds.length > 0) {
        qb.where("article.id NOT IN (:...protectedIds)", {
            protectedIds,
        });
    }

    const articles = await qb.getMany();

    if (articles.length === 0) {
        console.log("[deleteArticles] no deletable articles");
        return;
    }

    const deleteIds = articles.map((article) => article.id);

    // 削除
    const result = await articleRepo.delete({
        id: In(deleteIds),
    });

    console.log(
        `[deleteArticles] deleted ${result.affected ?? 0} articles`
    );

    console.log("[deleteArticles] end");
};