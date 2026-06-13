import { DataSource } from "typeorm";
import { Bookmark } from "../../domain/entity/bookmarks.entity";

export const BookmarkData = async (dataSource: DataSource) => {
    const bookmarkRepository = dataSource.getRepository(Bookmark);

    const bookmarks = [
        {
            profile_id: 1,
            platform_id: 1,
            article_id: 1,
            title: "NestJS入門",
            article_url: "https://qiita.com/a1",
            thumbnail_url: "https://example.com/img1.png",
            platform_name: "Qiita",
            platform_url: "https://qiita.com",
            platform_favicon_url: "https://qiita.com/favicon.ico",
            is_read: false,
        },
        {
            profile_id: 1,
            platform_id: 2,
            article_id: 2,
            title: "TypeORM Relations",
            article_url: "https://zenn.dev/a2",
            thumbnail_url: "https://example.com/img2.png",
            platform_name: "Zenn",
            platform_url: "https://zenn.dev",
            platform_favicon_url: "https://zenn.dev/favicon.ico",
            is_read: true,
        },
        {
            profile_id: 1,
            platform_id: 3,
            article_id: 3,
            title: "Scaling Node Apps",
            article_url: "https://medium.com/a3",
            thumbnail_url: "https://example.com/img3.png",
            platform_name: "Medium",
            platform_url: "https://medium.com",
            platform_favicon_url: "https://medium.com/favicon.ico",
            is_read: false,
        },
        {
            profile_id: 2,
            platform_id: 4,
            article_id: 4,
            title: "Clean Architecture",
            article_url: "https://dev.to/a4",
            thumbnail_url: "https://example.com/img4.png",
            platform_name: "Dev.to",
            platform_url: "https://dev.to",
            platform_favicon_url: "https://dev.to/favicon.ico",
            is_read: true,
        },
        {
            profile_id: 2,
            platform_id: 5,
            article_id: 5,
            title: "AI Trends 2026",
            article_url: "https://news.ycombinator.com/a5",
            thumbnail_url: "https://example.com/img5.png",
            platform_name: "Hacker News",
            platform_url: "https://news.ycombinator.com",
            platform_favicon_url: "https://news.ycombinator.com/favicon.ico",
            is_read: false,
        }
    ];

    const entities = bookmarkRepository.create(bookmarks);

    await bookmarkRepository.save(entities);

    console.log(
        "Bookmarks seed complete:",
        await bookmarkRepository.find()
    );
};