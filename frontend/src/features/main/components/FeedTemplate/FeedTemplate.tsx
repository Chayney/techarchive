import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import styles from "./style.module.css";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import { usePagination } from "../../../article/hooks/usePagination";
import { useArticleActions } from "../../../article/hooks/useArticleActions";
import { useArticleData } from "../../../article/hooks/useArticleData";

export const FeedTemplate = () => {
    const { profileId, isAuth } = useAuthContext();

    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const { articles, categories, loading: feedLoading } = useArticleData(searchKeyword, "latest");

    const pagination = usePagination(articles);

    const actions = useArticleActions(profileId ?? undefined);

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
                {feedLoading ? (
                    <Loader2 />
                ) : (
                    <>
                        {pagination.paginated.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                
                            />
                        ))}

                        <Pagination
                            totalItems={articles.length}
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