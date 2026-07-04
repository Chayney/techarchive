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
import { FolderTagPlatform } from "./folder_tag_platforms.entity";

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

    @OneToMany(() => FolderTagPlatform, folderTagPlatform => folderTagPlatform.folder, { cascade: true })
    folderTagPlatforms!: FolderTagPlatform[];

    @ManyToOne(() => Profile, (profile) => profile.folders, { onDelete: "CASCADE" })
    @JoinColumn({ name: "profile_id" })
    profile!: Profile;
}