import { getNews } from "../services/newsService.js";

export const getAllNews = async (req, res, next) => {
    try {

        const {
            category,
            date,
            page = "1",
            limit = "10"
        } = req.query;

        const news = await getNews(
            category,
            date,
            Number(page),
            Number(limit)
        );

        res.status(200).json({
            success: true,
            data: news,
        });

    } catch (error) {
        next(error);
    }
};