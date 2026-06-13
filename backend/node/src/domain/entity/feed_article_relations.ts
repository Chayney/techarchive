import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from "typeorm";
import { Feed } from "./feeds.entity";
import { Article } from "./articles.entity";

@Entity("feed_article_relations")
@Index(["feed_id", "article_id"], { unique: true }) // Goの実質ユニーク制約再現
export class FeedArticleRelation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "feed_id" })
    feed_id!: number;

    @Column({ name: "article_id" })
    article_id!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Feed, (feed) => feed.articles, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "feed_id" })
    feed!: Feed;

    @ManyToOne(() => Article, (article) => article.feed, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "article_id" })
    article!: Article;
}