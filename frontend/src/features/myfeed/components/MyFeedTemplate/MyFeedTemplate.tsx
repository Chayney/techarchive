import { useEffect, useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { Header } from "../../../../shared/components/layouts/Header/Header";
import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";

import { usePagination } from "../../../article/hooks/usePagination";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";

type MyFeedArticle = {
    id: number;
    title: string;
    article_url: string;
    thumbnail_url: string | null;
    published_at: Date;

    feed: {
        tags: string;
        platform: {
            favicon_url: string;
            name: string;
        };
    };
};

export const MyFeedTemplate = () => {
    const { id } = useParams();
    const folderId = Number(id);

    const [articles, setArticles] = useState<MyFeedArticle[]>([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");

    // 🔍 フィルタ
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(_searchKeyword.toLowerCase())
    );

    // 📄 pagination
    const pagination = usePagination(filteredArticles);

    /* =========================
       FETCH
    ========================= */
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://localhost:3000/api/folders/${folderId}/articles`
                );

                if (!res.ok) {
                    throw new Error("failed to fetch articles");
                }

                const data: MyFeedArticle[] = await res.json();
                setArticles(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (folderId) {
            fetchArticles();
        }
    }, [folderId]);

    return (
        <Layout
            header={
                <Header
                    title="my feed"
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
                                    title: article.title,
                                    article_url:
                                        article.article_url,
                                    thumbnail_url:
                                        article.thumbnail_url,
                                    published_at: article.published_at,
                                    tags: article.feed?.tags ?? ""
                                }}
                                platform={article.feed.platform}
                            />
                        ))}

                        <Pagination
                            totalItems={filteredArticles.length}
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