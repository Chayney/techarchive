import { useState } from "react";
import Layout from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import styles from "./style.module.css";

export const MyFeedTemplate = () => {
    const [keyword, setKeyword] = useState("");
    const [_searchKeyword, setSearchKeyword] = useState("");

    const cards = [
        {
            title: "Next.js",
            description: "Next.jsの記事一覧",
            count: 24,
        },
        {
            title: "React",
            description: "Reactの記事一覧",
            count: 18,
        },
        {
            title: "TypeScript",
            description: "TypeScriptの記事一覧",
            count: 32,
        },
        {
            title: "GCP",
            description: "GCPの記事一覧",
            count: 12,
        },
        {
            title: "AWS",
            description: "AWSの記事一覧",
            count: 20,
        },
        {
            title: "Cloud",
            description: "クラウド関連の記事一覧",
            count: 15,
        },
    ];

    return (
        <Layout
            // header={
            //     <Header
            //         title={categoryName}
            //         keyword={keyword}
            //         onKeywordChange={setKeyword}
            //         onSearch={(value) => {
            //             setSearchKeyword(value);
            //             pagination.setPage(1);
            //         }}
            //     />
            // }
        >
            <main className={styles.container}>
                <div className={styles.grid}>
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className={styles.card}
                        >
                            <h2>{card.title}</h2>

                            <p>
                                {card.description}
                            </p>

                            <span>
                                {card.count} articles
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </Layout>
    );
};