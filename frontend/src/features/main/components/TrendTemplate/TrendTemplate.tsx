import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { Loader2 } from "lucide-react";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { useArticleActions } from "../../../article/hooks/useArticleActions";
import { usePagination } from "../../../article/hooks/usePagination";
import { useTrendTemplate } from "./useTrendTemplate";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";

export const TrendTemplate = () => {
    const { profileId, isAuth } = useAuthContext();
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const { trendArticles } = useTrendTemplate();

    const pagination = usePagination(trendArticles);

    const actions = useArticleActions(profileId ?? undefined);

    return (
        <Layout
            header={
                <Header
                    title="Trend"
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
               
                    <>
                        {pagination.paginated.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={{
                                    id: article.id,
                                    title: article.article.title,
                                    article_url:
                                        article.article.article_url,
                                    thumbnail_url:
                                        article.article.thumbnail_url,
                                    published_at: article.article.published_at,
                                    tags:
                                        article.tags
                                }}
                                likes_count={article.likes_count}
                                
                            />
                        ))}

                        <Pagination
                            totalItems={trendArticles.length}
                            itemsPerPage={10}
                            currentPage={pagination.page}
                            onPageChange={pagination.setPage}
                        />
                    </>
            
            </main>
        </Layout>
    );
};