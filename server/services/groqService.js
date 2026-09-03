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

Your job is to analyze the supplied articles and select the best stories
that are directly useful to software developers.

ALLOWED CATEGORIES:
AI, Dev Tools, Frontend, Backend, DevOps, Security

REJECT:
- Politics
- Entertainment
- Sports
- General finance
- Healthcare
- Marketing
- General business
- Non-technical news

STRICT RULES:

1. Use ONLY information contained in the supplied articles.
2. Never invent facts.
3. Never create a story that does not exist in the supplied articles.
4. Remove duplicate events.
5. Prefer the most technically relevant and important stories.
6. Return EXACTLY 10 stories if 10 or more valid developer-relevant
   articles are available.
7. If fewer than 10 valid developer-relevant articles are available,
   return all valid stories. NEVER fabricate stories to reach 10.
8. Each returned story must correspond to exactly one supplied article.
9. technologies must contain ONLY technologies explicitly mentioned
   in that article.
10. Write a developer-focused summary in 2-3 sentences.
11. importance must be an integer from 1 to 10.
12. relevance must be one of:
    "High", "Medium", "Low"
13. category must be exactly one of:
    "AI", "Dev Tools", "Frontend", "Backend", "DevOps", "Security"
14. Keep the original article id, source and url.
15. Do not modify or invent URLs.
16. Do not return duplicate articles.
17. Return ONLY valid JSON.

SELECTION PRIORITY:

When more than 10 valid articles exist, select the 10 most important
stories using this priority:

1. Major AI releases and developments
2. Important developer tools and frameworks
3. Major security vulnerabilities affecting developers
4. Frontend and backend framework updates
5. DevOps, cloud and infrastructure developments
6. Important programming language updates
7. Other technically significant developer news

OUTPUT FORMAT:

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

IMPORTANT:
If there are 10 or more valid articles, the "news" array MUST contain
exactly 10 objects.

If there are fewer than 10 valid articles, return only the valid articles.

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