import styles from "./style.module.css";

export const CompanyTemplate = () => {
    return (
        <main className={styles.notFound}>
            <div className={styles.stars}></div>

            <section className={styles.card}>
                <div className={styles.code}>
                    4<span>0</span>4
                </div>

                <h1>ページが見つかりません</h1>

                <p>
                    お探しのページは存在しないか、
                    <br />
                    移動された可能性があります。
                </p>

                <div className={styles.actions}>
                    <button
                        className={styles.home}
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        ホームへ戻る
                    </button>

                    <button
                        className={styles.back}
                        onClick={() => window.history.back()}
                    >
                        戻る
                    </button>
                </div>
            </section>

            <div className={styles.planet}></div>
            <div className={styles.glow}></div>
        </main>
    );
};