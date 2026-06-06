import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Unique,
} from "typeorm";
import { Category } from "./categories.entity";
import { Article } from "./articles.entity";

@Entity("favorite_articles")
@Unique(["category", "article"])
export class FavoriteArticle {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Category, (category) => category.favoriteArticles, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @ManyToOne(() => Article, (article) => article.favoriteArticles, { onDelete: "CASCADE" })
    @JoinColumn({ name: "article_id" })
    article!: Article;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;
}