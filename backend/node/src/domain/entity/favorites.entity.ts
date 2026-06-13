import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Unique,
    Column,
} from "typeorm";
import { Category } from "./categories.entity";
import { Article } from "./articles.entity";

@Entity("favorites")
// @Unique(["category", "article"])
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: true })
    category_id!: number;

    @Column({ type: "integer", nullable: true })
    article_id!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    // @ManyToOne(() => Category, (category) => category.favorites, { onDelete: "CASCADE" })
    // @JoinColumn({ name: "category_id" })
    // category!: Category;

    // @ManyToOne(() => Article, (article) => article.favorites, { onDelete: "CASCADE" })
    // @JoinColumn({ name: "article_id" })
    // article!: Article;
}