import { useEffect, useMemo, useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Button } from "../../../../shared/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../../../../shared/components/ui/dialog";
import { Input } from "../../../../shared/components/ui/input";
import { X } from "lucide-react";
import { useFolder } from "../../hooks/useFolder";
import { Link } from "react-router-dom";
import { NAVIGATION_PATH } from "../../../../shared/const/navigation";
import type { Folder, TagPlatform } from "../../types/myfeed";
import { useFolderListContext } from "../../hooks/useFolderListContext";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { useAllMyFeedTemplate } from "./useAllMyFeedTemplate";

export const AllMyFeedTemplate = () => {
    const { requireAuth } = useAuthContext()
    const { folderList, tagPlatforms, fetchFolders } = useFolderListContext();
    const { createFolder, saveFolderTagPlatforms, updateFolder, deleteFolder } = useFolder();
    const { folderNameError, validateFolderName, clearFolderNameError } = useAllMyFeedTemplate();

    const [selectOpen, setSelectOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [tagKeyword, setTagKeyword] = useState("");
    const [selected, setSelected] = useState<TagPlatform[]>([]);
    const [folderName, setFolderName] = useState("");
    const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const filteredTagPlatforms = useMemo(() => {
        return tagPlatforms.filter((item) =>
            item.tag.toLowerCase().includes(tagKeyword.toLowerCase())
        );
    }, [tagPlatforms, tagKeyword]);

    const [detailFolder, setDetailFolder] = useState<Folder | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    // フォルダ内のリストが4件以上の表示処理
    const folderWithMeta = useMemo(() => {
        return (folderList ?? []).map(folder => {
            const items = folder.folderTagPlatforms ?? [];

            return {
                ...folder,
                visibleItems: items.slice(0, 3),
                remainingCount: items.length - 3,
            };
        });
    }, [folderList]);

    const filteredFolders = useMemo(() => {
        return folderWithMeta.filter(folder =>
            folder.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [folderWithMeta, searchKeyword]);
    
    const openCreateDialog = () => {
        if (!requireAuth()) return;
        setEditingFolder(null);
        setFolderName("");
        setSelected([]);
        setOpen(true);
    };

    const toggle = (item: TagPlatform) => {
        const exists = selected.some(
            x => x.tag === item.tag && x.platform.id === item.platform.id
        );

        if (exists) {
            setSelected(prev =>
                prev.filter(
                    x => !(x.tag === item.tag && x.platform.id === item.platform.id)
                )
            );
        } else {
            setSelected(prev => [...prev, item]);
        }
    };

    const remove = (item: TagPlatform) => {
        setSelected(prev =>
            prev.filter(
                x => !(x.tag === item.tag && x.platform.id === item.platform.id)
            )
        );
    };

    const handleSave = async () => {
        if (!validateFolderName(folderName)) {
            return;
        }
        try {
            setLoading(true);

            if (editingFolder) {
                await updateFolder(
                    editingFolder.id,
                    folderName,
                    selected.map(item => ({
                        tag: item.tag,
                        platform_id: item.platform.id,
                    }))
                );

                await fetchFolders();

            } else {
                const folder = await createFolder(folderName);

                await saveFolderTagPlatforms(
                    folder.id,
                    selected.map(item => ({
                        tag: item.tag,
                        platform_id: item.platform.id,
                    }))
                );

                await fetchFolders();
            }

            setSelectOpen(false);
            setOpen(false);
            setSelected([]);
            setFolderName("");
            setEditingFolder(null);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFolder = async (folderId: number) => {
        try {
            setLoading(true);

            await deleteFolder(folderId);

            await fetchFolders();

            setOpen(false);
            setEditingFolder(null);
            setSelected([]);
            setFolderName("");

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // フォルダ情報を編集フォームにセットする
    useEffect(() => {
        if (!editingFolder) return;

        setFolderName(editingFolder.name);

        setSelected(
            editingFolder.folderTagPlatforms.map(item => ({
                id: item.platform.id,
                tag: item.tag,
                platform: item.platform,
                articles: []
            }))
        );
    }, [editingFolder]);

    return (
        <Layout
            header={
                <Header
                    title="My Feed List"
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={setSearchKeyword}
                    actions={
                        <Button variant="secondary" onClick={openCreateDialog}>
                            作成
                        </Button>
                    }
                />
            }
        >
            <main className={styles.container}>
                <div className={styles.grid}>
                    {(filteredFolders ?? []).length === 0 ? (
                        <div className={styles.empty}>
                            フォルダがありません
                        </div>
                    ) : (
                        filteredFolders.map(folder => (
                            <div key={folder.id} className={styles.card}>

                                <Link to={`${NAVIGATION_PATH.MYFOLDER}/${folder.id}`}>
                                    <h2>{folder.name}</h2>
                                </Link>

                                {/* tag/platform preview */}
                                <div className={styles.labelInFolder}>
                                    {folder.visibleItems?.map((item, index) => (
                                        <div
                                            key={`${item.platform.id}-${item.tag}`}
                                            className={styles.tagRow}
                                        >
                                            <div className={styles.platformLabelInFolder}>
                                                <span>{item.tag}</span>

                                                <span className={styles.muted}>
                                                    {" | "}
                                                    {item.platform.name}
                                                </span>
                                            </div>

                                            {index === folder.visibleItems.length - 1 &&
                                                folder.remainingCount > 0 && (
                                                    <Button
                                                        className={styles.moreButton}
                                                        onClick={() => {
                                                            setDetailFolder(folder);
                                                            setDetailOpen(true);
                                                        }}
                                                    >
                                                        +{folder.remainingCount}
                                                    </Button>
                                                )}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        if (!requireAuth()) return;
                                        setEditingFolder(folder);
                                        setOpen(true);
                                    }}
                                >
                                    編集
                                </Button>
                                <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                                    <DialogContent className={styles.scrollArea}>
                                        <DialogTitle>タグ一覧</DialogTitle>

                                        {detailFolder?.folderTagPlatforms?.map((item) => (
                                            <div key={`${item.platform.id}-${item.tag}`}>
                                                {item.tag} | {item.platform.name}
                                            </div>
                                        ))}
                                    </DialogContent>
                                </Dialog>

                            </div>
                        ))
                    )}
                </div>

                <Dialog
                    open={open}
                    onOpenChange={(value) => {
                        if (!value) {
                            clearFolderNameError();
                            setEditingFolder(null);
                        }
                        setOpen(value);
                    }}
                >
                    <DialogContent showCloseButton={false}>
                        <DialogTitle>
                            {editingFolder ? "フォルダの編集" : "フォルダの作成"}
                        </DialogTitle>

                        <Input
                            placeholder="フォルダ名"
                            value={folderName}
                            onChange={(e) => {
                                setFolderName(e.target.value);
                                if (folderNameError) {
                                    clearFolderNameError();
                                }
                            }}
                            inputSize="md"
                        />
                        {folderNameError && (
                            <p className={styles.errorMessage}>
                                {folderNameError}
                            </p>
                        )}

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
                            選択
                        </Button>

                        <div className={styles.dialogFooter}>
                            <Button variant="secondary" onClick={() => {
                                setOpen(false);
                                setEditingFolder(null);
                            }}>
                                閉じる
                            </Button>
                            <Button variant="destructive" onClick={handleSave} disabled={loading}>
                                {editingFolder ? "更新" : "作成"}
                            </Button>
                            {editingFolder && (
                                <Button
                                    variant="secondary"
                                    onClick={() => handleDeleteFolder(editingFolder.id)}
                                    disabled={loading}
                                >
                                    削除
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={selectOpen}
                    onOpenChange={(value) => {
                        setSelectOpen(value);
                    }}
                >
                    <DialogContent showCloseButton={false}>
                        <DialogTitle>タグを選択</DialogTitle>

                        <Input
                            placeholder="search keyword"
                            className={styles.search}
                            value={tagKeyword}
                            onChange={(e) => setTagKeyword(e.target.value)}
                        />

                        <div className={styles.platformList}>
                            {filteredTagPlatforms.map((item) => {
                                const checked = selected.some(
                                    x =>
                                        x.tag === item.tag &&
                                        x.platform.id === item.platform.id
                                );

                                return (
                                    <div
                                        key={`${item.platform.id}-${item.tag}`}
                                        className={styles.platformRow}
                                        onClick={() => toggle(item)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            readOnly
                                        />

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
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectOpen(false);
                                }}
                            >
                                閉じる
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </main>
        </Layout>
    );
};