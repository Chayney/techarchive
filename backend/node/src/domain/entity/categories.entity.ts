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
import { Feed } from "./feeds.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: number;

    @OneToMany(() => Feed, (feed) => feed.category)
    feeds!: Feed[];
}