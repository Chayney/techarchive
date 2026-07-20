import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";
import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { useTrendTemplate } from "./useTrendTemplate";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";

export const TrendTemplate = () => {
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [page, setPage] = useState(1);

    const { trendArticles, total, loading } = useTrendTemplate(page, searchKeyword);

    return (
        <Layout
            header={
                <Header
                    title="Trend"
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={(value) => {
                        setSearchKeyword(value);
                        setPage(1);
                    }}
                />
            }
        >
            <main className={styles.underContainer}>

                {loading ? (
                    <Loader2 className={styles.spinner} />
                ) : (
                    <>
                        {trendArticles.map((article) => (
                            <ArticleCard
                                key={article.article.id}
                                article={{
                                    id: article.article.id,
                                    title: article.article.title,
                                    article_url:
                                        article.article.article_url,
                                    thumbnail_url:
                                        article.article.thumbnail_url,
                                    published_at:
                                        article.article.published_at,
                                    tags:
                                        article.tags,
                                }}
                                likes_count={article.likes_count}
                                platform={article.platform}
                            />
                        ))}


                        <Pagination
                            totalItems={total}
                            itemsPerPage={10}
                            currentPage={page}
                            onPageChange={(newPage) => {
                                setPage(newPage);
                                window.scrollTo(0, 0);
                            }}
                        />
                    </>
                )}

            </main>
        </Layout>
    );
};