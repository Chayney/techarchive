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
    is_admin!: boolean;

    @Column({ default: true })
    is_active!: boolean;

    @Column({ type: "timestamp", nullable: true  })
    email_verified_at?: Date;

    @Column({ type: "timestamp", nullable: true  })
    last_login_at?: Date;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile!: Profile;
}