// src/batch/jobs/ogp.job.ts

import { DataSource } from "typeorm";
import { Article } from "../../domain/entity/articles.entity";

export async function ogpJob(
    dataSource: DataSource
) {
    const repo =
        dataSource.getRepository(
            Article
        );

    const articles =
        await repo.find({
            where: {
                thumbnail_url: "",
            },
        });

    for (const article of articles) {
        try {
            const image =
                await fetchOgpImage(
                    article.article_url
                );

            if (!image)
                continue;

            article.thumbnail_url =
                image;

            await repo.save(
                article
            );
        } catch (e) {
            console.error(e);
        }
    }
}

async function fetchOgpImage(
    url: string
) {
    const res =
        await fetch(url);

    if (!res.ok)
        return "";

    const html =
        await res.text();

    const match =
        html.match(
            /property=["']og:image["'][^>]*content=["'](.*?)["']/i
        );

    return (
        match?.[1] ?? ""
    );
}