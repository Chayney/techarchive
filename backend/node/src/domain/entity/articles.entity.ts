import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Platform } from "./platforms.entity";
import { Trend } from "./trends.entity";
import { Favorite } from "./favorites.entity";
import { Bookmark } from "./bookmarks.entity";

@Entity("articles")
export class Article {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    platform_id!: number;

    @Column()
    source_type!: number;

    @Column()
    title!: string;

    @Column()
    article_url!: string;

    // NULL許容する場合object扱いになるためtypeを指定
    @Column({ type: "text", nullable: true })
    thumbnail_url!: string | null;

    @Column({ default: false })
    is_private!: boolean;

    @Column()
    published_at!: Date;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Platform, (platform) => platform.articles)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;

    @OneToMany(() => Trend, (trend) => trend.article)
    trends!: Trend[];

    @OneToMany(() => Favorite, (favorite) => favorite.article)
    favorites!: Favorite[];

    @OneToMany(() => Bookmark, (bookmark) => bookmark.article)
    bookmarks!: Bookmark[];
}