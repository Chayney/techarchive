export const ZennClient = {
    async fetch(articleSlug: string) {
        const query = `
            query Article($slug: String!) {
                article(slug: $slug) {
                    likedCount
                }
            }
        `;

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

        if (!json?.data?.article) {
            throw new Error("Zenn API error: article not found");
        }

        return {
            likedCount: json.data.article.likedCount,
        };
    },
};