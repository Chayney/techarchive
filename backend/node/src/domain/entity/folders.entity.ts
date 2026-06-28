import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { Profile } from "./profiles.entity";
import { FolderFeed } from "./folder_feeds.entity";

@Entity("folders")
export class Folder {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    profile_id!: number;

    @Column()
    name!: string;

    @CreateDateColumn({ name: "created_at" })
    created_at!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updated_at!: Date;

    @ManyToOne(() => Profile, profile => profile.folders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;

    @OneToMany(() => FolderFeed, feed => feed.folder)
    folderFeed!: FolderFeed[];
}