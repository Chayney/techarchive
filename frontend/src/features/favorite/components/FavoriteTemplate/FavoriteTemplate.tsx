import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { useFavoriteTemplate } from "./useFavoriteTemplate";
import { usePagination } from "../../../article/hooks/usePagination";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";

export const FavoriteTemplate = () => {
    const { id } = useParams();
    const categoryId = Number(id);
    const { favoriteArticles, loading } = useFavoriteTemplate();
    
    const filteredArticles = favoriteArticles.filter((article) => article.category_id === categoryId)
    
    const pagination = usePagination(filteredArticles);
    const categoryName = filteredArticles[0]?.category.name;

    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");

    return (
        <Layout
            header={
                <Header
                    title={categoryName}
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
                                key={article.id}
                                article={{
                                    id: article.id,
                                    title: article.article.title,
                                    article_url:
                                        article.article.article_url,
                                    thumbnail_url:
                                        article.article.thumbnail_url,
                                    published_at: article.article.published_at,
                                }}
                            />
                        ))}

                        <Pagination
                            totalItems={favoriteArticles.length}
                            itemsPerPage={10}
                            currentPage={pagination.page}
                            onPageChange={pagination.setPage}
                        />
                    </>
                )}
            </main>
        </Layout>
    );
}