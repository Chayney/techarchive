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
import { Feed } from "./feeds.entity";

@Entity("folder_feeds")
export class FolderFeed {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    folder_id!: number;

    @Column()
    feed_id!: number;

    @Column()
    tag!: string;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;
    
    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Folder, folder => folder.folderFeed, { onDelete: "CASCADE" })
    @JoinColumn({ name: "folder_id" })
    folder!: Folder;

    @ManyToOne(() => Feed, feed => feed.folderFeed)
    @JoinColumn({ name: "feed_id" })
    feed!: Feed;
}