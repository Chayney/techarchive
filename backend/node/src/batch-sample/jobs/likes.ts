import { WorkerPool } from "../core/worker-pool";
import { RateLimiter } from "../core/rate-limiter";
import { Article } from "../../domain/entity/articles.entity";
import { Trend } from "../../domain/entity/trends.entity";
import { DataSource } from "typeorm";

const qiitaLimiter = new RateLimiter(1000);
const zennLimiter = new RateLimiter(1500);

export async function likesJob(dataSource: DataSource) {
    console.log("[LIKES] start");

    const articleRepo =
        dataSource.getRepository(Article);

    const trendRepo =
        dataSource.getRepository(Trend);

    const articles = await articleRepo.find({
        relations: {
            platform: true,
        },
    });

    console.log(
        `[LIKES] total articles=${articles.length}`
    );

    const qiita = articles.filter(
        (a) => a.platform.name === "Qiita"
    );

    const zenn = articles.filter(
        (a) => a.platform.name === "Zenn"
    );

    console.log(
        `[LIKES] qiita=${qiita.length}`
    );

    console.log(
        `[LIKES] zenn=${zenn.length}`
    );

    // -----------------------
    // Qiita
    // -----------------------

    console.log("[LIKES] Qiita worker start");

    await new WorkerPool(3).run(
        qiita,
        async (article, index) => {
            console.log(
                `[QIITA ${index + 1}/${qiita.length}] waiting rate limit`
            );

            await qiitaLimiter.wait();

            const id = extractQiitaId(
                article.article_url
            );

            console.log(
                `[QIITA ${index + 1}/${qiita.length}] id=${id}`
            );

            const likes =
                await fetchQiitaLikes(id);

            console.log(
                `[QIITA ${index + 1}/${qiita.length}] likes=${likes}`
            );

            await trendRepo.save({
                article_id: article.id,
                platform_id: article.platform_id,
                likeCount: likes,
            });

            console.log(
                `[QIITA ${index + 1}/${qiita.length}] trend saved`
            );
        }
    );

    console.log("[LIKES] Qiita worker done");

    // -----------------------
    // Zenn
    // -----------------------

    console.log("[LIKES] Zenn worker start");

    await new WorkerPool(2).run(
        zenn,
        async (article, index) => {
            console.log(
                `[ZENN ${index + 1}/${zenn.length}] waiting rate limit`
            );

            await zennLimiter.wait();

            const slug = extractZennSlug(
                article.article_url
            );

            console.log(
                `[ZENN ${index + 1}/${zenn.length}] slug=${slug}`
            );

            const likes =
                await fetchZennLikes(slug);

            console.log(
                `[ZENN ${index + 1}/${zenn.length}] likes=${likes}`
            );

            await trendRepo.save({
                article_id: article.id,
                platform_id: article.platform_id,
                likeCount: likes,
            });

            console.log(
                `[ZENN ${index + 1}/${zenn.length}] trend saved`
            );
        }
    );

    console.log("[LIKES] Zenn worker done");

    console.log("[LIKES] completed");
}

// =======================
// Qiita
// =======================

async function fetchQiitaLikes(id: string) {
    const url =
        `https://qiita.com/api/v2/items/${id}`;

    console.log("[QIITA API] request", url);

    const res = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0",
        },
    });

    console.log(
        "[QIITA API] status",
        res.status
    );

    const body = await res.text();

    console.log(
        "[QIITA API] response",
        body.slice(0, 500)
    );

    return 0;
}

// =======================
// Zenn
// =======================

async function fetchZennLikes(slug: string) {
    console.log(
        `[ZENN API] request slug=${slug}`
    );

    try {
        const res = await fetch(
            `https://zenn.dev/api/articles/${slug}`
        );

        console.log(
            `[ZENN API] status=${res.status}`
        );

        if (!res.ok) {
            console.error(
                `[ZENN API] failed slug=${slug}`
            );

            return 0;
        }

        const data = await res.json();

        const likes =
            data.article?.liked_count ?? 0;

        console.log(
            `[ZENN API] likes=${likes}`
        );

        return likes;
    } catch (error) {
        console.error(
            `[ZENN API] exception`,
            error
        );

        return 0;
    }
}

// =======================
// URL Parser
// =======================

function extractQiitaId(url: string) {
    return (
        url.match(
            /items\/([a-zA-Z0-9]+)/
        )?.[1] ?? ""
    );
}

function extractZennSlug(url: string) {
    return (
        url.match(
            /articles\/([^/]+)$/
        )?.[1] ?? ""
    );
}