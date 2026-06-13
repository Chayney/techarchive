import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./categories.entity";
import { Platform } from "./platforms.entity";
import { Article } from "./articles.entity";

@Entity("feeds")
export class Feed {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column("text")
    description!: string;

    @Column({ name: "thumbnail_url", type: "text", nullable: true })
    thumbnail_url!: string | null;

    @Column({ name: "platform_id" })
    platform_id!: number;

    @Column({ name: "category_id" })
    category_id!: number;

    @Column({ name: "site_url" })
    site_url!: string;

    @Column({ name: "rss_url" })
    rss_url!: string;

    @Column({ name: "api_query_param", type: "text", nullable: true })
    api_query_param!: string | null;

    @Column({ name: "trend_platform_type", default: 0 })
    trend_platform_type!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at!: Date | null;

    @ManyToOne(() => Platform, (platform) => platform.feeds)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @ManyToOne(() => Category, (category) => category.feeds)
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @OneToMany(() => Article, (article) => article.feed)
    articles!: Article[];
}