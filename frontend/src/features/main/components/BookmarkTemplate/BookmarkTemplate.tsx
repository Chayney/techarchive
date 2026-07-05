import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { Loader2 } from "lucide-react";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { usePagination } from "../../../article/hooks/usePagination";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import { useBookmarkTemplate } from "./useBookmarkTemplate";

export const BookmarkTemplate = () => {
    // isAuthはcategory用に使用
    const { isAuth } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const { bookmarkArticles, loading } = useBookmarkTemplate();

    const filteredArticles = bookmarkArticles.filter((article) =>
        article.article.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
    );

    const pagination = usePagination(filteredArticles);

    return (
        <Layout
            header={
                <Header
                    title="Bookmark"
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={(value) => {
                        setSearchKeyword(value);
                        pagination.setPage(1);
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
                                key={article.article.id}
                                article={{
                                    id: article.article.id,
                                    title: article.article.title,
                                    article_url:
                                        article.article.article_url,
                                    thumbnail_url:
                                        article.article.thumbnail_url,
                                    published_at: article.article.published_at,                               
                                }}
                                platform={article.article.platform}
                            />
                        ))}

                        <Pagination
                            totalItems={bookmarkArticles.length}
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