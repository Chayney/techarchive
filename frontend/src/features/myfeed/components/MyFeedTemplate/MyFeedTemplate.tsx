import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { usePagination } from "../../../article/hooks/usePagination";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import { useFolderListContext } from "../../hooks/useFolderListcontext";

export const MyFeedTemplate = () => {
    const { id } = useParams();
    const tagPlatformId = Number(id);

    const { tagPlatforms } = useFolderListContext();

    const tagPlatform = tagPlatforms.find(
        (item) => item.id === tagPlatformId
    );

    const articles = tagPlatform?.articles ?? [];

    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const filteredArticles = articles.filter((article) =>
        article.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
    );
    
    const pagination = usePagination(filteredArticles);

    const loading = !tagPlatforms;

    return (
        <Layout
            header={
                <Header
                    title={`${tagPlatform?.tag ?? ""}/${tagPlatform?.platform?.name ?? ""}`}
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
                        {pagination.paginated.map((article) => (
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
                                platform={tagPlatform?.platform}
                            />
                        ))}

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