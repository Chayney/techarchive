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

@Entity("trends")
export class Trend {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "platform_id" })
    platform_id!: number;

    @Column({ name: "article_id" })
    article_id!: number;

    @Column({ name: "like_count", default: 0 })
    likes_count!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Platform, (platform) => platform.trends)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @ManyToOne(() => Article, (article) => article.trends)
    @JoinColumn({ name: "article_id" })
    article!: Article;
}