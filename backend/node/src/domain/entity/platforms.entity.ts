import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import { Article } from "./articles.entity";
import { Trend } from "./trends.entity";
import { Feed } from "./feeds.entity";

@Entity("platforms")
export class Platform {
    @PrimaryGeneratedColumn()
    id!: number;

    // Qiita、Zenn
    @Column()
    name!: string;

    // qiita.com、zenn.dev
    @Column()
    site_url!: string;

    // 1: Qiita、2: Zenn
    @Column()
    platform_site_type!: number;

    @Column()
    favicon_url!: string;

    @Column({ default: false })
    is_eng!: boolean;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at!: Date | null;

    @OneToMany(() => Feed, (feed) => feed.platform)
    feeds!: Feed[];

    @OneToMany(() => Article, (article) => article.platform)
    articles!: Article[];

    @OneToMany(() => Trend, (trend) => trend.platform)
    trends!: Trend[];
}