import axios from "axios";

export const getNews = async (
    category,
    date,
    page = 1,
    limit = 10
) => {
  try {

    const params = {
        q: category && category !== "all"
            ? category
            : "web development",
        lang: "en",
        max: limit,
        page,
        apikey: process.env.GNEWS_API_KEY,
    };

    // Only add dates when date exists
    if (date) {
        params.from = `${date}T00:00:00Z`;
        params.to = `${date}T23:59:59Z`;
    }

    const response = await axios.get(
        "https://gnews.io/api/v4/search",
        { params }
    );


    return response.data;
}catch(error){
  console.log("GNews error:", error.response?.status);
    console.log("GNews response:", error.response?.data);
throw error}
};