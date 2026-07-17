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
import { useFavoriteCategoryContext } from "../../hooks/useFavoriteCategoryContext";

export const FavoriteTemplate = () => {
    const { id } = useParams();
    const categoryId = Number(id);
    const { favoriteArticles, loading } = useFavoriteTemplate();
    const { categories } = useFavoriteCategoryContext();

    const category = categories.find((category) => category.id === categoryId);
    const categoryName = category?.name ?? null;

    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const categoryArticles = favoriteArticles.filter((article) => article.category_id === categoryId);

    const filteredArticles = categoryArticles.filter((article) =>
        article.article.title
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
    );

    const pagination = usePagination(filteredArticles); 

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
                ) : categoryArticles.length === 0 ? (
                    <div className={styles.emptyCard}>
                        <h3>お気に入り記事はありません</h3>
                        <p>
                            記事一覧から🔖ボタンを押してブックマーク登録してください
                        </p>
                    </div>
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
                            totalItems={categoryArticles.length}
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
}