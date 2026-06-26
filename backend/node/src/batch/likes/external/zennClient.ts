export const fetchZennLikesCountFromApi = async () => {
    console.log("[Zenn] fetch start");

    const [
        response1, response2, response3, response4, response5,
        response6, response7, response8, response9, response10,
        response11, response12, response13, response14, response15,
        response16, response17, response18, response19, response20,
        response21, response22, response23, response24, response25,
        response26, response27, response28, response29, response30
    ] = await Promise.all([
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=1"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=2"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=3"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=4"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=5"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=6"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=7"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=8"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=9"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=10"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=11"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=12"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=13"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=14"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=15"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=16"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=17"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=18"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=19"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=20"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=21"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=22"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=23"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=24"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=25"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=26"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=27"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=28"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=29"),
        fetch("https://zenn.dev/api/articles?count=48&order=latest&page=30"),
    ]);

    console.log("[Zenn] response1 status:", response1.status);
    console.log("[Zenn] response2 status:", response2.status);
    console.log("[Zenn] response3 status:", response3.status);

    if (!response1.ok) {
        console.error("[Zenn] API Error:", response1.status);
        throw new Error(`Zenn API Error: ${response1.status}`);
    }

    if (!response2.ok) {
        console.error("[Zenn] API Error:", response2.status);
        throw new Error(`Zenn API Error: ${response2.status}`);
    }

    if (!response3.ok) {
        console.error("[Zenn] API Error:", response3.status);
        throw new Error(`Zenn API Error: ${response3.status}`);
    }

    const data1 = await response1.json();
    const data2 = await response2.json();
    const data3 = await response3.json();
    const data4 = await response4.json();
    const data5 = await response5.json();
    const data6 = await response6.json();
    const data7 = await response7.json();
    const data8 = await response8.json();
    const data9 = await response9.json();
    const data10 = await response10.json();
    const data11 = await response11.json();
    const data12 = await response12.json();
    const data13 = await response13.json();
    const data14 = await response14.json();
    const data15 = await response15.json();
    const data16 = await response16.json();
    const data17 = await response17.json();
    const data18 = await response18.json();
    const data19 = await response19.json();
    const data20 = await response20.json();
    const data21 = await response21.json();
    const data22 = await response22.json();
    const data23 = await response23.json();
    const data24 = await response24.json();
    const data25 = await response25.json();
    const data26 = await response26.json();
    const data27 = await response27.json();
    const data28 = await response28.json();
    const data29 = await response29.json();
    const data30 = await response30.json();

    const data = {
        articles: [
            ...data1.articles,
            ...data2.articles,
            ...data3.articles,
            ...data4.articles,
            ...data5.articles,
            ...data6.articles,
            ...data7.articles,
            ...data8.articles,
            ...data9.articles,
            ...data10.articles,
            ...data11.articles,
            ...data12.articles,
            ...data13.articles,
            ...data14.articles,
            ...data15.articles,
            ...data16.articles,
            ...data17.articles,
            ...data18.articles,
            ...data19.articles,
            ...data20.articles,
            ...data21.articles,
            ...data22.articles,
            ...data23.articles,
            ...data24.articles,
            ...data25.articles,
            ...data26.articles,
            ...data27.articles,
            ...data28.articles,
            ...data29.articles,
            ...data30.articles,
        ],
    };

    console.log("[Zenn] fetched data:", data);

    return data.articles;
};