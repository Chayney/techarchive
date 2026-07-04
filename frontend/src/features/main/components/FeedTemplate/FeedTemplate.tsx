import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import styles from "./style.module.css";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import { usePagination } from "../../../article/hooks/usePagination";
import { useFeedTemplate } from "./useFeedTemplate";

export const FeedTemplate = () => {
    // const { profileId, isAuth } = useAuthContext();

    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");

    const { feedArticles, loading } = useFeedTemplate();

    const pagination = usePagination(feedArticles);

    return (
        <Layout
            header={
                <Header
                    title="Feed"
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
                                    tags:
                                        article.tags
                                }}
                                platform={article.platform}     
                            />
                        ))}

                        <Pagination
                            totalItems={feedArticles.length}
                            itemsPerPage={10}
                            currentPage={pagination.page}
                            onPageChange={pagination.setPage}
                        />
                    </>
                )}
            </main>
        </Layout>
    );
};