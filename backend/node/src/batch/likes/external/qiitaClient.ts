export const fetchQiitaLikesCountFromApi = async () => {
    console.log("[Qiita] fetch start");

    const [
        response1, response2, response3, response4, response5,
        response6, response7, response8, response9, response10,
        response11, response12, response13, response14, response15,
        response16, response17, response18, response19, response20,
        response21, response22, response23, response24, response25,
        response26, response27, response28, response29, response30,
        response31, response32, response33, response34, response35,
        response36, response37, response38, response39, response40,
        response41, response42, response43, response44, response45,
        response46, response47, response48, response49, response50,
        response51, response52, response53, response54, response55,
        response56, response57, response58, response59, response60
    ] = await Promise.all([
        fetch("https://qiita.com/api/v2/items?page=1&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=2&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=3&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=4&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=5&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=6&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=7&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=8&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=9&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=10&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=11&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=12&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=13&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=14&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=15&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=16&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=17&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=18&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=19&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=20&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=21&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=22&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=23&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=24&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=25&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=26&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=27&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=28&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=29&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=30&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=31&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=32&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=33&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=34&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=35&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=36&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=37&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=38&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=39&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=40&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=41&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=42&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=43&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=44&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=45&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=46&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=47&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=48&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=49&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=50&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=51&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=52&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=53&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=54&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=55&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=56&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=57&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=58&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=59&per_page=100"),
        fetch("https://qiita.com/api/v2/items?page=60&per_page=100"),
    ]);

    const responses = [
        response1, response2, response3, response4, response5,
        response6, response7, response8, response9, response10,
        response11, response12, response13, response14, response15,
        response16, response17, response18, response19, response20,
        response21, response22, response23, response24, response25,
        response26, response27, response28, response29, response30,
        response31, response32, response33, response34, response35,
        response36, response37, response38, response39, response40,
        response41, response42, response43, response44, response45,
        response46, response47, response48, response49, response50,
        response51, response52, response53, response54, response55,
        response56, response57, response58, response59, response60
    ];

    responses.forEach((response, index) => {
        console.log(`[Qiita] response${index + 1} status:`, response.status);

        if (!response.ok) {
            console.error("[Qiita] API Error:", response.status);
            throw new Error(`Qiita API Error: ${response.status}`);
        }
    });

    const dataArray = await Promise.all(
        responses.map((response) => response.json())
    );

    const data = dataArray.flat();

    console.log("[Qiita] fetched data:", data);

    return data;
};