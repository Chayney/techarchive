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

    @Column()
    name!: string;

    @Column({ name: "site_url" })
    site_url!: string;

    @Column({ name: "platform_site_type" })
    platform_site_type!: number;

    @Column({ name: "favicon_url" })
    favicon_url!: string;

    @Column({
        name: "is_eng",
        default: false,
    })
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