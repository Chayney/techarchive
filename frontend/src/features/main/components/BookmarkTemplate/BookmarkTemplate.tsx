import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";
import { Loader2 } from "lucide-react";

import { Header } from "../../../../shared/components/layouts/Header/Header";

import { Pagination } from "../../../../shared/components/layouts/Pagination/Pagination";
import { useBookmark } from "../../../article/hooks/useBookmark";
import { usePagination } from "../../../article/hooks/usePagination";
import { useArticleActions } from "../../../article/hooks/useArticleActions";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";

export const BookmarkTemplate = () => {
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const {
        bookmarkArticles,
        categories,
        profileId,
        loading: bookmarkLoading,
        isAuth
    } = useBookmark(searchKeyword);

    const pagination = usePagination(bookmarkArticles);

    const actions = useArticleActions(profileId ?? undefined);

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
                {bookmarkLoading ? (
                    <Loader2 />
                ) : !isAuth ? (
                    <div>ログインしていません</div>
                ) : bookmarkArticles.length === 0 ? (
                    <div className={styles.emptyCard}>
                        <h3>ブックマーク記事はありません</h3>
                        <p>
                            記事一覧から🔖ボタンを押してブックマーク登録してください
                        </p>
                    </div>
                ) : (
                    <>
                        {pagination.paginated.map((article) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                
                            />
                        ))}

                        <Pagination
                            totalItems={bookmarkArticles.length}
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