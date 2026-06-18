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

    @Column({ name: "article_id" })
    article_id!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Article, (article) => article.bookmarks)
    @JoinColumn({ name: "article_id" })
    article!: Article;
    
    @ManyToOne(() => Profile, (profile) => profile.bookmarks, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;
}