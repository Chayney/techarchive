import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
    Column,
    UpdateDateColumn,
} from "typeorm";
import { Folder } from "./folders.entity";
import { Platform } from "./platforms.entity";

@Entity("folder_platforms")
export class FolderPlatform {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    folder_id!: number;

    @Column()
    platform_id!: number;

    @Column()
    tag!: string;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Folder, folder => folder.folderFeed, { onDelete: "CASCADE" })
    @JoinColumn({ name: "folder_id" })
    folder!: Folder;

    @ManyToOne(() => Platform)
    @JoinColumn({ name: "platform_id" })
    platform!: Platform;
}