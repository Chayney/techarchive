import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./articles.entity";
import { Platform } from "./platforms.entity";
import { Profile } from "./profiles.entity";

@Entity("bookmarks")
export class Bookmark {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "profile_id" })
    profile_id!: number;

    @Column({
        name: "platform_id",
        nullable: true,
    })
    platform_id?: number;

    @Column({ name: "article_id" })
    article_id!: number;

    @Column()
    title!: string;

    @Column({ name: "article_url" })
    article_url!: string;

    @Column({ name: "thumbnail_url" })
    thumbnail_url!: string;

    @Column({ name: "platform_name" })
    platform_name!: string;

    @Column({ name: "platform_url" })
    platform_url!: string;

    @Column({ name: "platform_favicon_url" })
    platform_favicon_url!: string;

    @Column({
        name: "is_read",
        type: "boolean",
        default: false,
    })
    is_read!: boolean;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    // Relations
    // @ManyToOne(() => Article, (article) => article.bookmarks)
    // @JoinColumn({ name: "article_id" })
    // article!: Article;

    // @ManyToOne(() => Platform, (platform) => platform.bookmarks, {
    //     nullable: true,
    // })
    
    @JoinColumn({ name: "platform_id" })
    platform?: Platform;

    @ManyToOne(() => Profile, (profile) => profile.bookmarks, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;
}