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

type PlatformTag = {
    platform_id: number;
    platform: string;
    tag: string;
};

export const MyFeedTemplate = () => {
    const { open, setOpen } = useFeedTemplate();
    const { getPlatformTags, saveFolderPlatforms, deleteFolderPlatform } = useFolder();

    const [selectOpen, setSelectOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");
    const [selected, setSelected] = useState<PlatformTag[]>([]);
    const [platformTags, setPlatformTags] = useState<PlatformTag[]>([]);

    const folderId = 10;

    const cards = [
        { title: "Next.js", description: "Next.jsの記事一覧", count: 24 },
        { title: "React", description: "Reactの記事一覧", count: 18 },
        { title: "TypeScript", description: "TypeScriptの記事一覧", count: 32 },
        { title: "GCP", description: "GCPの記事一覧", count: 12 },
        { title: "AWS", description: "AWSの記事一覧", count: 20 },
        { title: "Cloud", description: "クラウド関連の記事一覧", count: 15 },
    ];

    useEffect(() => {
        const fetchPlatformTags = async () => {
            const data = await getPlatformTags();
            setPlatformTags(data);
        };

        fetchPlatformTags();
    }, []);


    const toggle = (item: PlatformTag) => {
        const exists = selected.some(
            x =>
                x.platform_id === item.platform_id &&
                x.tag.toLowerCase() === item.tag.toLowerCase()
        );

        if (exists) {
            setSelected(prev =>
                prev.filter(
                    x =>
                        !(
                            x.platform_id === item.platform_id &&
                            x.tag.toLowerCase() === item.tag.toLowerCase()
                        )
                )
            );
        } else {
            setSelected(prev => [
                ...prev,
                item
            ]);
        }
    };


    const remove = async (item: PlatformTag) => {

        setSelected(prev =>
            prev.filter(
                x =>
                    !(
                        x.platform_id === item.platform_id &&
                        x.tag === item.tag
                    )
            )
        );


        await deleteFolderPlatform(
            folderId,
            item.platform_id,
            item.tag
        );
    };


    const handleSave = async () => {

        await saveFolderPlatforms(
            folderId,
            selected.map(item => ({
                platform_id: item.platform_id,
                tag: item.tag
            }))
        );

        setOpen(false);
    };


    return (
        <Layout
            header={
                <Header
                    title="My Feed List"
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={(value) => setSearchKeyword(value)}
                    actions={
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(true)}
                        >
                            追加
                        </Button>
                    }
                />
            }
        >
            <main className={styles.container}>
                <div className={styles.grid}>
                    {cards.map(card => (
                        <div
                            key={card.title}
                            className={styles.card}
                        >
                            <h2>{card.title}</h2>
                            <p>{card.description}</p>
                            <span>{card.count} articles</span>
                        </div>
                    ))}
                </div>

                <Dialog
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DialogContent className={styles.folderDialog}>
                        <DialogTitle>フォルダの編集</DialogTitle>

                        <div className={styles.selectedArea}>
                            {selected.map(item => (
                                <div
                                    key={`${item.platform_id}-${item.tag}`}
                                    className={styles.tagChip}
                                >
                                    <span>
                                        # {item.tag} | {item.platform}
                                    </span>

                                    <button
                                        onClick={() => remove(item)}
                                    >
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
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                CLOSE
                            </Button>

                            <Button
                                onClick={handleSave}
                            >
                                DONE
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>


                <Dialog
                    open={selectOpen}
                    onOpenChange={setSelectOpen}
                >
                    <DialogContent className={styles.selectDialog}>
                        <DialogTitle>タグを選択</DialogTitle>

                        <Input
                            placeholder="search keyword"
                            className={styles.search}
                        />


                        <div className={styles.platformList}>

                            {platformTags.map(item => {

                                const checked =
                                    selected.some(
                                        x =>
                                            x.platform_id === item.platform_id &&
                                            x.tag.toLowerCase() === item.tag.toLowerCase()
                                    );

                                return (
                                    <div
                                        key={`${item.platform_id}-${item.tag}`}
                                        className={styles.platformRow}
                                        onClick={() => toggle(item)}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            readOnly
                                        />

                                        <div className={styles.platformLabel}>
                                            <span>
                                                {item.tag}
                                            </span>

                                            <span className={styles.muted}>
                                                {" | "}
                                                {item.platform}
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

                            <Button
                                onClick={() => setSelectOpen(false)}
                            >
                                DONE
                            </Button>

                        </div>

                    </DialogContent>
                </Dialog>

            </main>
        </Layout>
    );
};