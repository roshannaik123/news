import { getNews } from "../services/newsService.js";
import { generateNewsWithGroq } from "../services/groqService.js";
import { removeDuplicates } from "../utils/removeDuplicates.js";
import {
    getCachedNews,
    setCachedNews,
    appendCachedNews
} from "../cache/cache.js";

export const getAllNews = async (req, res, next) => {
    try {
        const {
            category = "all",
            date,
            page = "1",
            limit = "10"
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        // Same cache for all pages of this category
        const cacheKey = `${category}-${date || "latest"}`;

        // 1. Check cache
        const cachedNews = getCachedNews(cacheKey);
        console.log("CachedNews",cachedNews)

        // If requesting page 1 and cache exists
        if (cachedNews && pageNumber === 1) {
            return res.status(200).json({
                success: true,
                source: "cache",
                data: cachedNews.slice(0,limitNumber)
            });
        }

        // 2. Get next page from GNews
        const news = await getNews(
            category,
            date,
            pageNumber,
            limitNumber
        );

        // 3. Remove duplicates
        const uniqueArticles = removeDuplicates(
            news.articles || []
        );

        // 4. No articles
        if (uniqueArticles.length === 0) {
            return res.status(200).json({
                success: true,
                source: "api",
                data: [],
                message: "No more articles found"
            });
        }

        // 5. Generate AI news
        const aiNews = await generateNewsWithGroq(
            uniqueArticles
        );

        let finalNews;

        // 6. Page 1 → create cache
        if (pageNumber === 1) {
            setCachedNews(cacheKey, aiNews);
            finalNews = aiNews;
        }

        // 7. Page 2+ → append to existing cache
        else {
            finalNews = appendCachedNews(
                cacheKey,
                aiNews
            );
        }

        // 8. Return
        return res.status(200).json({
            success: true,
            source: "api",
            page: pageNumber,
            data: finalNews
        });

    } catch (error) {
        next(error);
    }
};