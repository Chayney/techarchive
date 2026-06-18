import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Feed } from "./feeds.entity";
import { Profile } from "./profiles.entity";
import { Favorite } from "./favorites.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Profile, (profile) => profile.categories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;

    @OneToMany(() => Favorite, (favorite) => favorite.article)
    favorites!: Favorite[];
}