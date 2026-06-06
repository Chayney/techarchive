import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { FavoriteArticle } from "./favorite_articles.entity";
import { Profile } from "./profiles.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToOne(() => Profile, (profile) => profile.categories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;

    @OneToMany(() => FavoriteArticle, (fa) => fa.category)
    favoriteArticles!: FavoriteArticle[];
}