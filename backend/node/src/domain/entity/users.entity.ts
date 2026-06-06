import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Profile } from "./profiles.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: false })
    isAdmin!: boolean;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ nullable: true, type: "timestamp" })
    emailVerifiedAt?: Date;

    @Column({ nullable: true, type: "timestamp" })
    lastLoginAt?: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile!: Profile;
}