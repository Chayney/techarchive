import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Platform } from "./platforms.entity";
import { TrendArticle } from "./trend_articles.entity";
import { FavoriteArticle } from "./favorite_articles.entity";

@Entity("articles")
export class Article {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: true })
    platform_id!: number;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar" })
    article_url!: string;

    @Column({ type: "timestamp", nullable: true })
    published_at!: Date | null;

    @Column({ type: "varchar", nullable: true })
    author_name!: string | null;

    @Column({ type: "varchar", nullable: true })
    tags!: string | null;

    @Column({ type: "varchar" })
    thumbnail_url!: string;

    @Column({ type: "boolean" })
    is_eng!: boolean;

    @Column({ type: "boolean" })
    is_private!: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToOne(() => Platform, (platform) => platform.articles)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @OneToMany(() => TrendArticle, (ta) => ta.article)
    trendArticles!: TrendArticle[];

    @OneToMany(() => FavoriteArticle, (fa) => fa.article)
    favoriteArticles!: FavoriteArticle[];
}