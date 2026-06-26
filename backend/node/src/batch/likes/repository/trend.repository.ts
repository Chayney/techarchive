import { AppDataSource } from "../../../config/appDataSource"
import { Trend } from "../../../domain/entity/trends.entity";
import { filteredArticles } from "../service/articles.service";

export const upsertLikesCount = async () => {
    console.log("[upsertLikesCount] start");

    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);

    const latestArticles = await filteredArticles();
    console.log(`[upsertLikesCount] latestArticles count: ${latestArticles.length}`);

    const savedArticles = await repo.find({
        relations: {
            article: true
        }
    });
    console.log(`[upsertLikesCount] savedArticles count: ${savedArticles.length}`);

    console.log(
        "[upsertLikesCount] invalid article count:",
        savedArticles.filter(article => !article.article).length
    );

    savedArticles
        .filter(article => !article.article)
        .forEach(article => {
            console.log("[upsertLikesCount] invalid record:", article.id);
        });
    
    console.log(
        savedArticles.slice(0, 5).map(x => ({
            id: x.id,
            article: x.article,
        }))
    );

    const dbMap = new Map(
        savedArticles.map(article => [article.article.article_url, article])
    )

    const updateTargets: Trend[] = [];

    for (const latest of latestArticles) {
        console.log(`[upsertLikesCount] checking: ${latest.article_url}`);

        const existing = dbMap.get(latest.article_url);

        if (!existing) {
            console.log(`[upsertLikesCount] not found in DB: ${latest.article_url}`);
            continue;
        }

        if (existing.likes_count !== latest.likes_count) {
            console.log(
                `[upsertLikesCount] likes_count changed: ${latest.article_url} (${existing.likes_count} -> ${latest.likes_count})`
            );

            existing.likes_count = latest.likes_count;
            updateTargets.push(existing);
        } else {
            console.log(
                `[upsertLikesCount] no change: ${latest.article_url} (${latest.likes_count})`
            );
        }
    }

    console.log(`[upsertLikesCount] updateTargets count: ${updateTargets.length}`);

    if (updateTargets.length > 0) {
        await repo.save(updateTargets);
        console.log(`[upsertLikesCount] saved ${updateTargets.length} records`);
    } else {
        console.log("[upsertLikesCount] no records to update");
    }

    console.log("[upsertLikesCount] end");
}