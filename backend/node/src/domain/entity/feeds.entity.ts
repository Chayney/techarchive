import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Platform } from "./platforms.entity";
import { Article } from "./articles.entity";

@Entity("feeds")
export class Feed {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    platform_id!: number;

    @Column()
    article_id!: number;

    // NULL許容する場合object扱いになるためtypeを指定
    @Column({ type: "text", nullable: true })
    tags!: string | null;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at!: Date | null;

    @ManyToOne(() => Platform, (platform) => platform.feeds)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @ManyToOne(() => Article, (article) => article.trends)
    @JoinColumn({ name: "article_id" })
    article!: Article;
}