import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "openai/gpt-oss-120b";

export const generateNewsWithGroq = async (articles) => {

    if (!articles || articles.length === 0) {
        throw new Error("No articles provided");
    }
const formattedArticles = articles.map((article, index) => ({
    index: index + 1,
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url,
    publishedAt: article.publishedAt,
    source: article.source?.name
}));

  const prompt = `
You are the editor of WebDev Times.

Analyze the supplied articles and return only stories relevant to software developers.

Allowed categories:
AI, Dev Tools, Frontend, Backend, DevOps, Security.

Reject:
politics, entertainment, sports, general finance,
healthcare, marketing, general business and non-technical news.

Rules:
- Use ONLY information from the supplied articles.
- Never invent facts.
- Remove duplicate events.
- Return at most 10 stories.
- Return fewer if fewer relevant stories exist.
- Write a 2-3 sentence developer-focused summary.
- technologies must contain only technologies mentioned in the article.
- importance must be 1-10.

Return ONLY JSON in this format:

{
  "news": [
    {
      "id": "string",
      "title": "string",
      "summary": "string",
      "technologies": ["string"],
      "relevance": "High",
      "category": "AI",
      "importance": 8,
      "source": "string",
      "url": "string"
    }
  ]
}

Articles:
${JSON.stringify(formattedArticles)}
`;

    const completion = await groq.chat.completions.create({
        model: MODEL,

        messages: [
            {
                role: "system",
                content:
                    "You are a strict technology news editor. Never fabricate information."
            },
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.3,

        max_tokens: 6000,

        response_format: {
            type: "json_object"
        }
    });

    const text =
        completion.choices[0]?.message?.content || "{}";

    const parsed = JSON.parse(text);

    // Our model may return { news: [...] }
    // or { articles: [...] }
    // depending on its response.

    if (Array.isArray(parsed)) {
        return parsed;
    }

    if (Array.isArray(parsed.news)) {
        return parsed.news;
    }

    if (Array.isArray(parsed.articles)) {
        return parsed.articles;
    }

    throw new Error("Groq returned invalid news format");
};