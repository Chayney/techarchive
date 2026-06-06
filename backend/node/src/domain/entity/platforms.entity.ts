import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Article } from "./articles.entity";
import { TrendArticle } from "./trend_articles.entity";

@Entity("platforms")
export class Platform {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    siteUrl!: string;

    @Column()
    platformSiteType!: number;

    @Column()
    faviconUrl!: string;

    @Column()
    isEng!: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @Column({ type: "timestamp", nullable: true })
    deletedAt!: Date | null;

    // ===== Relations =====

    @OneToMany(() => Article, (article) => article.platform)
    articles!: Article[];

    @OneToMany(() => TrendArticle, (ta) => ta.platform)
    trendArticles!: TrendArticle[];

    // @OneToMany(() => Bookmark, (bookmark) => bookmark.platform)
    // bookmarks!: Bookmark[];

    // @OneToMany(() => FavoriteArticle, (fa) => fa.platform)
    // favoriteArticles!: FavoriteArticle[];

    // @OneToMany(() => Feed, (feed) => feed.platform)
    // feeds!: Feed[];
}