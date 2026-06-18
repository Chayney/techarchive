import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./users.entity";
import { Category } from "./categories.entity";
import { Bookmark } from "./bookmarks.entity";

@Entity("profiles")
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", nullable: true })
    user_id!: number;

    @Column()
    name!: string;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @OneToMany(() => Category, (category) => category.profile)
    categories!: Category[];

    @OneToMany(() => Bookmark, (bookmark) => bookmark.profile)
    bookmarks!: Bookmark[];
}