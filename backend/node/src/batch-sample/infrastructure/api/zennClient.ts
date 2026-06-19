export const ZennClient = {
    async fetch(articleSlug: string) {
        const query = `
            query Article($slug: String!) {
                article(slug: $slug) {
                    likesCount
                    topics {
                        name
                    }
                }
            }
        `;

        console.log("\n==============================");
        console.log("📡 ZENN GRAPHQL REQUEST");
        console.log("SLUG:", articleSlug);

        const res = await fetch("https://zenn.dev/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables: {
                    slug: articleSlug,
                },
            }),
        });

        if (!res.ok) {
            throw new Error(
                `Zenn API error: ${res.status} ${res.statusText}`
            );
        }

        const json = await res.json();

        // ==================================================
        // 🔥 RAWレスポンス全部ログ（重要）
        // ==================================================
        console.log("\n📦 ZENN GRAPHQL RAW RESPONSE:");
        console.log(JSON.stringify(json, null, 2));

        if (!json?.data?.article) {
            console.error("❌ article not found");
            throw new Error("Zenn API error: article not found");
        }

        const article = json.data.article;

        // ==================================================
        // 🧠 likesCount
        // ==================================================
        console.log("\n👍 LIKES COUNT:", article.likesCount);

        // ==================================================
        // 🏷️ topics（tags）
        // ==================================================
        const tags =
            article.topics?.map((t: any) => t.name) ?? [];

        console.log("🏷️ TOPICS (TAGS):", tags);

        // ==================================================
        // 🔍 safety debug
        // ==================================================
        console.log("\n🔎 ARTICLE STRUCTURE CHECK:");
        console.log("has topics:", !!article.topics);
        console.log("topics raw:", article.topics);

        return {
            likesCount: article.likesCount,
            tags,
        };
    },
};