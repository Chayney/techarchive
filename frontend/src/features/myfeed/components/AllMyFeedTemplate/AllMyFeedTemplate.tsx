import { useEffect, useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Button } from "../../../../shared/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../../../../shared/components/ui/dialog";
import { Input } from "../../../../shared/components/ui/input";
import { useFeedTemplate } from "./useFeedTemplate";
import { X } from "lucide-react";
import { useFolder } from "../../hooks/useFolder";
import { Link } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../../shared/const/navigation";
import type { Folder, FolderFeed, TagPlatform } from "../../types/myfeed";
import { useFolderListContext } from "../../hooks/useFolderListcontext";

export const AllMyFeedTemplate = () => {
    const { open, setOpen } = useFeedTemplate();
    const { folderList } = useFolderListContext();
    const { tagPlatforms } = useFolder();
    console.log(tagPlatforms)

    const [selectOpen, setSelectOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");

    const [selected, setSelected] = useState<TagPlatform[]>([]);
    const [feedItems, setFeedItems] = useState<FolderFeed[]>([]);

    const [loading, setLoading] = useState(false);
    const [folderName, setFolderName] = useState("");
    const [folders, setFolders] = useState<Folder[]>([]);

    /* =========================
       Toggle select
    ========================= */
    const toggle = (item: TagPlatform) => {
        const exists = selected.some(
            x =>
                x.tag === item.tag &&
                x.platform.name === item.platform.name
        );

        if (exists) {
            setSelected(prev =>
                prev.filter(
                    x =>
                        !(
                            x.tag === item.tag &&
                            x.platform.name === item.platform.name
                        )
                )
            );
        } else {
            setSelected(prev => [...prev, item]);
        }
    };

    /* =========================
       Remove selected
    ========================= */
    const remove = (item: TagPlatform) => {
        setSelected(prev =>
            prev.filter(
                x =>
                    !(
                        x.tag === item.tag &&
                        x.platform.name === item.platform.name
                    )
            )
        );
    };

    /* =========================
       Save folder + feeds
    ========================= */
    // const handleSave = async () => {
    //     try {
    //         setLoading(true);

    //         const folder = await createFolder(folderName);

    //         await saveFolderFeeds(
    //             folder.id,
    //             selected.map(item => ({
    //                 feed_id: item.feed_id,
    //                 tag: item.tag,
    //             }))
    //         );

    //         setSelectOpen(false);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <Layout
            header={
                <Header
                    title="My Feed List"
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={setSearchKeyword}
                    actions={
                        <Button variant="secondary" onClick={() => setOpen(true)}>
                            追加
                        </Button>
                    }
                />
            }
        >
            <main className={styles.container}>

                {/* =========================
                    Folder list
                ========================= */}
                <div className={styles.grid}>
                    {(folderList ?? []).length === 0 ? (
                        <div className={styles.empty}>
                            フォルダがありません
                        </div>
                    ) : (
                        folderList.map(folder => (
                            <div key={folder.id} className={styles.card}>
                                <Link to={`${NAVIGATION_PATH.MYFEED}/${folder.id}`}>
                                    <h2>{folder.name}</h2>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

                {/* =========================
                    Folder create dialog
                ========================= */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className={styles.folderDialog}>
                        <DialogTitle>フォルダの編集</DialogTitle>

                        <Input
                            placeholder="フォルダ名"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />

                        {/* selected feeds */}
                        <div className={styles.selectedArea}>
                            {selected.map(item => (
                                <div
                                    key={`${item.platform.id}-${item.tag}`}
                                    className={styles.tagChip}
                                >
                                    <span>
                                        # {item.tag} | {item.platform.name}
                                    </span>

                                    <button onClick={() => remove(item)}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="secondary"
                            onClick={() => setSelectOpen(true)}
                        >
                            SELECT
                        </Button>

                        <div className={styles.dialogFooter}>
                            <Button variant="secondary" onClick={() => setOpen(false)}>
                                CLOSE
                            </Button>
                            {/* <Button onClick={handleSave} disabled={loading}>
                                DONE
                            </Button> */}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* =========================
                    Feed select dialog
                ========================= */}
                <Dialog open={selectOpen} onOpenChange={setSelectOpen}>
                    <DialogContent className={styles.selectDialog}>
                        <DialogTitle>タグを選択</DialogTitle>

                        <Input
                            placeholder="search keyword"
                            className={styles.search}
                        />

                        <div className={styles.platformList}>
                            {tagPlatforms.map(item => {
                                const checked = selected.some(
                                    x =>
                                        x.tag === item.tag &&
                                        x.platform.name === item.platform.name
                                );

                                return (
                                    <div
                                        key={`${item.platform.id}-${item.tag}`}
                                        className={styles.platformRow}
                                        onClick={() => toggle(item)}
                                    >
                                        <input type="checkbox" checked={checked} readOnly />

                                        <div className={styles.platformLabel}>
                                            <span>{item.tag}</span>

                                            <span className={styles.muted}>
                                                {" | "}
                                                {item.platform.name}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.dialogFooter}>
                            <Button
                                variant="secondary"
                                onClick={() => setSelectOpen(false)}
                            >
                                CLOSE
                            </Button>
                            {/* <Button onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "DONE"}
                            </Button> */}
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </Layout>
    );
};