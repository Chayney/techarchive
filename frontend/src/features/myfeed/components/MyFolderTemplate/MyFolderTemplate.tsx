import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { usePagination } from "../../../article/hooks/usePagination";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import { useFolderListContext } from "../../hooks/useFolderListContext";

export const MyFolderTemplate = () => {
    const { id } = useParams();

    const myFolderId = Number(id);

    const {
        folderList,
        tagPlatforms
    } = useFolderListContext();

    /**
     * 親Folder取得
     */
    const folder = folderList.find(
        (folder) => folder.id === myFolderId
    );

    /**
     * Folderに登録されているtag/platformだけ取得
     */
    const folderTagPlatforms =
        folder?.folderTagPlatforms ?? [];

    /**
     * tagPlatformsと紐付けて記事取得
     */
    const articles = folderTagPlatforms.flatMap(
        (folderTagPlatform) => {

            const tagPlatform = tagPlatforms.find(
                (item) =>
                    item.tag === folderTagPlatform.tag &&
                    item.platform.id === folderTagPlatform.platform.id
            );

            return tagPlatform?.articles ?? [];
        }
    );

    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const filteredArticles = articles.filter((article) =>
        article.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
    );

    const pagination = usePagination(filteredArticles);

    const loading = !folder || tagPlatforms.length === 0;


    return (
        <Layout
            header={
                <Header
                    title={folder?.name ?? ""}
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={(value) => {
                        setSearchKeyword(value);
                        pagination.setPage(1);
                        window.scrollTo(0, 0);
                    }}
                />
            }
        >
            <main className={styles.underContainer}>

                {loading ? (

                    <Loader2 className={styles.spinner} />

                ) : (

                    <>

                        {pagination.paginated.map((article) => {
                            const tagPlatform =
                                folderTagPlatforms.find(
                                    (folderTagPlatform) => {

                                        const matched =
                                            tagPlatforms.find(
                                                (item) =>
                                                    item.tag === folderTagPlatform.tag &&
                                                    item.platform.id === folderTagPlatform.platform.id
                                            );

                                        return matched?.articles.some(
                                            (item) =>
                                                item.id === article.id
                                        );
                                    }
                                );


                            const platform = tagPlatform?.platform;

                            return (
                                <ArticleCard
                                    key={article.id}
                                    article={{
                                        id: article.id,
                                        title: article.title,
                                        article_url: article.article_url,
                                        thumbnail_url: article.thumbnail_url,
                                        published_at: article.published_at,
                                        tags: tagPlatform?.tag ?? "",
                                    }}
                                    platform={platform}
                                />
                            );
                        })}

                        <Pagination
                            totalItems={filteredArticles.length}
                            itemsPerPage={10}
                            currentPage={pagination.page}
                            onPageChange={(page) => {
                                pagination.setPage(page);
                                window.scrollTo(0, 0);
                            }}
                        />

                    </>
                )}
            </main>
        </Layout>
    );
};