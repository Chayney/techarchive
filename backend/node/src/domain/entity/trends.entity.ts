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

    @Column()
    platform_id!: number;

    @Column()
    article_id!: number;

    @Column({ default: 0 })
    likes_count!: number;

    // NULL許容する場合object扱いになるためtypeを指定
    @Column({ type: "text", nullable: true })
    tags!: string | null;

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