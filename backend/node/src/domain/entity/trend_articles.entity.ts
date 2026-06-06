import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import { Platform } from "./platforms.entity";
import { Article } from "./articles.entity";

@Entity("trend_articles")
export class TrendArticle {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "like_count", default: 0 })
    likeCount!: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToOne(() => Platform, (platform) => platform.articles)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @ManyToOne(() => Article, (article) => article.trendArticles)
    @JoinColumn({ name: "article_id" })
    article!: Article;
}