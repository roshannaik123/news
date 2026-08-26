import stringSimilarity from "string-similarity";

export const removeDuplicates = (articles) => {
    const uniqueArticles = [];

    for (const article of articles) {

        const currentTitle = article.title
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .trim();

        const isDuplicate = uniqueArticles.some((existingArticle) => {

            const existingTitle = existingArticle.title
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .trim();

            const similarity = stringSimilarity.compareTwoStrings(
                currentTitle,
                existingTitle
            );

            console.log(
                `"${article.title}"`,
                "vs",
                `"${existingArticle.title}"`,
                "=>",
                similarity
            );

            return similarity >= 0.75;
        });

        if (!isDuplicate) {
            uniqueArticles.push(article);
        }
    }

    return uniqueArticles;
};