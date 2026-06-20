import { Layout } from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import { useTrendTemplate } from "./useTrendTemplate";
import { ArticleCard } from "../../../article/components/ArticleCard/ArticleCard";
import styles from "./style.module.css";

export const TrendTemplate = () => {
    const { trendArticles } = useTrendTemplate();

    if (!trendArticles || trendArticles.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <main className={styles.underContainer}>
                {trendArticles.map((article) => (
                    <ArticleCard
                        article={{
                            id: article.id,
                            title: article.article.title,
                            article_url:
                                article.article.article_url,
                            thumbnail_url:
                                article.article.thumbnail_url,
                            updated_at: article.article.updated_at,
                            tags:
                                article.tags
                        }}
                        likes_count={article.likes_count}
                    />
                ))}
            </main>
        </Layout>
    );
};