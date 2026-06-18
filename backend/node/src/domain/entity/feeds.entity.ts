import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Platform } from "./platforms.entity";

@Entity("feeds")
export class Feed {
    @PrimaryGeneratedColumn()
    id!: number;

    // Qiitaのトレンド、Zennのトレンド
    @Column({ name: "name", type: "text", nullable: true })
    name!: string | null;

    // 各プラットフォームのロゴ
    @Column({ name: "thumbnail_url", type: "text", nullable: true })
    thumbnail_url!: string | null;

    @Column({ name: "platform_id" })
    platform_id!: number;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deleted_at!: Date | null;

    @ManyToOne(() => Platform, (platform) => platform.feeds)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;
}