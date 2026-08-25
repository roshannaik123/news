import axios from "axios";

export const getNews = async (
    category,
    date,
    page = 1,
    limit = 10
) => {

    const response = await axios.get(
        "https://gnews.io/api/v4/search",
        {
            params: {
                q: category || "web development",
                from: `${date}T00:00:00Z`,
                to: `${date}T23:59:59Z`,
                lang: "en",
                max: limit,
                page,
                apikey: process.env.GNEWS_API_KEY,
            },
        }
    );

    return response.data;
};